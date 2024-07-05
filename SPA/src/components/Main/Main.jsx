import styles from './styles.module.scss'
import RepositoryCard from '../RepositoryCard/RepositoryCard'

function Main({ repos }) {

  return (
    <main className={styles.main}>
      {
        repos.map((repo) => 
          <RepositoryCard 
            repo={repo}
            key={repo.id}
          />
        )
      }
    </main>
  )

}

export default Main