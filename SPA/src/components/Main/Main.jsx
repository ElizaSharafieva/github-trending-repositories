import { useState } from 'react'
import styles from './styles.module.scss'
import RepositoryCard from '../RepositoryCard/RepositoryCard'
import Preloader from '../Preloader/Preloader'

function Main({ repos, isLoading }) {
  const [visibleCount, setVisibleCount] = useState(10)

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 10)
  }

  return (
    isLoading ? 
    <Preloader /> 
    :
    <main className={styles.main}>
      {
        repos.slice(0, visibleCount).map((repo) => (
          <RepositoryCard 
            repo={repo}
            key={repo.id}
          />
        ))
      }
      {visibleCount < repos.length && (
        <button type="button" className={styles.main__button} onClick={loadMore}>
          Загрузить еще
        </button>
      )}
    </main>
  )
}

export default Main