import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import styles from './styles.module.scss'
import Header from '../Header/Header'
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm'
import RepositoryWrapper from '../RepositoryWrapper/RepositoryWrapper'

function App() {

  const [repos, setRepos] = useState([]);
  const [value, setValue] = useState('');

  const fetchRepositories = async () => {
    try {
      const response = await axios(`http://localhost:3000/repositories`)
      setRepos(response.data)
    } catch(err) {
      console.log(err);
    }
  }

  const startAutoSync = async () => {
    try {
      const response = await axios(`http://localhost:3000/sync/start`)
      console.log(response.data.message)
      return response;
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('каждый раз отрабатываю')
    startAutoSync()
    fetchRepositories()
  }, [])

  return (
    <div className={styles.app}>
      <Header onSync={fetchRepositories} />
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
