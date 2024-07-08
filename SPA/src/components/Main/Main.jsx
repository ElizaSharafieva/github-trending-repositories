import styles from './styles.module.scss'
import RepositoryCard from '../RepositoryCard/RepositoryCard'

function Main({ repos }) {

  return (
    <main className={styles.main}>
      {
        repos.map((repo, index) => {
          if (index < 10)
            return <RepositoryCard 
              repo={repo}
              key={repo.id}
            />
        }
        )
      }
    </main>
  )

}

export default Main