import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import styles from './styles.module.scss'
import Header from '../Header/Header'
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm'
import RepositoryWrapper from '../RepositoryWrapper/RepositoryWrapper'

function App() {

  const APIURL = process.env.REACT_APP_API_URL

  const [repos, setRepos] = useState([]);
  const [value, setValue] = useState('');
  const [nextSyncTime, setNextSyncTime] = useState(null);
  const [lastUpdate, setLastUpdate] = useState('');

  const syncIntervalRef = useRef(null);

  const fetchRepositories = async () => {
    try {
      const response = await axios(`${APIURL}/repositories`)
      setRepos(response.data)
      setLastUpdate(new Date(response.data[0].last_synced))
    } catch(err) {
      console.log(err);
    }
  }

  const startAutoSync = async () => {
    try {
      const response = await axios(`${APIURL}/sync/start`)
      console.log(response.data.message)
      await fetchNextSyncTime();
      return response;
    } catch(err) {
      console.log(err);
    }
  };

  const fetchNextSyncTime = async () => {
    try {
      const response = await axios(`${APIURL}/sync/next`);
      setNextSyncTime(response.data.nextSyncTime);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await startAutoSync();
      await fetchRepositories();
    };
    
    init();

    const timeUntilNextSync = nextSyncTime - Date.now();
    if (timeUntilNextSync > 0) {
      syncIntervalRef.current = setInterval(async () => {
        init();
      }, timeUntilNextSync);
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [nextSyncTime]);

  return (
    <div className={styles.app}>
      <Header onSync={fetchRepositories} fetchNextSyncTime={fetchNextSyncTime} lastUpdate={lastUpdate}/>
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
