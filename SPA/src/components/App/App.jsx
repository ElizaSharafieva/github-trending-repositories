import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import styles from './styles.module.scss'
import Header from '../Header/Header'
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm'
import RepositoryWrapper from '../RepositoryWrapper/RepositoryWrapper'

function App() {

  const APIURL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

  const [repos, setRepos] = useState([]);
  const [value, setValue] = useState('');
  const [nextSyncTime, setNextSyncTime] = useState(null);
  const [nextResetTime, setNextResetTime] = useState(null);
  const [lastUpdate, setLastUpdate] = useState('');
  const syncIntervalRef = useRef(null);

  const fetchRepositories = async () => {
    try {
      const response = await axios(`${APIURL}/repositories`, { withCredentials: true })
      setRepos(response.data.repositories)
      console.log(response.data.nextResetTime)
      setNextResetTime(response.data.nextResetTime)
      setLastUpdate(new Date(response.data.repositories[0].last_synced))
    } catch(err) {
      console.log(err);
    }
  }

  const startAutoSync = async () => {
    try {
      const response = await axios.post(`${APIURL}/sync/start`, { withCredentials: true })
      console.log(response.data.message)
      setNextSyncTime(response.data.nextSyncTime)
    } catch(err) {
      console.log(err);
    }
  };

  const initialize = async () => {
    await startAutoSync();
    await fetchRepositories();
  };

  useEffect(() => {
    console.log('ИНИШАЛ')
    initialize();
  }, [nextResetTime]); 


  console.log(nextSyncTime)

  useEffect(() => {
    if (nextSyncTime) {
      const timeUntilNextSync = nextSyncTime - Date.now();

      if (timeUntilNextSync > 0) {
        syncIntervalRef.current = setTimeout(async () => {
          await initialize();
        }, timeUntilNextSync);
      }
    }

    return () => {
      if (syncIntervalRef.current) {
        clearTimeout(syncIntervalRef.current);
      }
    };
  }, [nextSyncTime]);

  return (
    <div className={styles.app}>
      <Header onSync={fetchRepositories} lastUpdate={lastUpdate} setNextSyncTime={setNextSyncTime}/>
      <SearchForm value={value} setValue={setValue} />
      <Routes>
        <Route path="/" element={<Navigate to="/repositories" replace/>} />
        <Route path="/repositories" element={<Main repos={repos}/>}/>
        <Route path="/repositories/:identifier" element={<RepositoryWrapper />} />
      </Routes>
    </div>
  )
}

export default App;
