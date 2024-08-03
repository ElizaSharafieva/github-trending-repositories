import { useEffect, useState, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from "axios"
import styles from './styles.module.scss'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SearchForm from '../SearchForm/SearchForm'
import RepositoryWrapper from '../RepositoryWrapper/RepositoryWrapper'
import useTimeoutEffect from '../../utils/useTimeoutEffect'

function App() {

  const APIURL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

  const [repos, setRepos] = useState([])
  const [value, setValue] = useState('')
  const [nextSyncTime, setNextSyncTime] = useState(null)
  const [nextResetTime, setNextResetTime] = useState(null)
  const [lastUpdate, setLastUpdate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const syncIntervalRef = useRef(null)
  const resetTimeoutRef = useRef(null)

  const updateState = (data) => {
    setRepos(data.repositories)
    setNextResetTime(data.nextResetTime)
    setLastUpdate(new Date(data.repositories[0].last_synced))
    setIsLoading(false)
  }

  const fetchRepositories = async () => {
    try {
      const response = await axios(`${APIURL}/repositories`, { withCredentials: true })
      return response.data
    } catch(err) {
      console.error('Error fetching repositories:', err)
    }
  }

  const startAutoSync = async () => {
    try {
      const response = await axios.post(`${APIURL}/sync/start`, { withCredentials: true })
      return response.data
    } catch(err) {
      console.error('Error starting auto sync:', err)
    }
  }

  const initialize = async () => {
    startAutoSync()
      .then(res => setNextSyncTime(res.nextSyncTime))
      .catch(err => console.error('Error starting auto sync:', err))
    fetchRepositories()
      .then(res => updateState(res))
      .catch(err => console.error('Error fetching repositories:', err))
  }

  useEffect(() => {
    initialize()
  }, [nextSyncTime])

  useTimeoutEffect(nextSyncTime, initialize, syncIntervalRef)
  useTimeoutEffect(nextResetTime, initialize, resetTimeoutRef)

  return (
    <div className={styles.app}>
      <Header 
        onSync={fetchRepositories} 
        lastUpdate={lastUpdate} 
        setNextSyncTime={setNextSyncTime}
        setIsLoading={setIsLoading}
      />
      <SearchForm value={value} setValue={setValue} />
      <Routes>
        <Route path="/" element={<Navigate to="/repositories" replace/>} />
        <Route path="/repositories" element={<Main repos={repos} isLoading={isLoading}/>}/>
        <Route path="/repositories/:identifier" element={<RepositoryWrapper />} />
      </Routes>
    </div>
  )
}

export default App
