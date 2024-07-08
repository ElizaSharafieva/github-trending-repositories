import styles from './styles.module.scss'
import React from 'react'
import SVGWrappepr from '../SvgComponents/SVGWrapper'
import {ReactComponent as Svg} from '../../images/star-svgrepo-com.svg'

const RepositoryCard = React.memo(( { repo }) => {

  return (
    <div>
      {
        (!repo.message) ? 
          <article className={styles.card}>
          <div>
            <a href={repo.repoUrl} target="_blank" rel="noreferrer" className={styles.card__title}>{repo.login} / <span className={styles.card__titleHiglight}>{repo.name}</span></a>
            <p className={styles.card__description}>{repo.description}</p>
            <ul className={styles.card__list}>
              <li className={styles.card__listItem}>
                <SVGWrappepr>
                  <Svg />
                </SVGWrappepr>
                {repo.stargazers_count}
              </li>
              {/* <li className={styles.card__listItem}>
                <SVGWrappepr>
                  <Svg />
                </SVGWrappepr>
                59 Today переписать
              </li> */}
            </ul>
          </div>
          <div className={styles.card__cardContainer}>
            <a href={repo.ownerUrl} target="_blank" rel="noreferrer" className={styles.card__link}>
              <img className={styles.card__image} src={repo.avatar} alt="иконка аватара" />
              <div className={styles.card__authorContainer}>
                <p className={styles.card__subtitle}>автор</p>
                <h2>{repo.login}</h2>
              </div>
            </a>
          </div>
          </article> 
          :
          <h2 className={styles.card__title_notFound}>{repo.message}</h2>
      }
    </div>
  )
})

export default RepositoryCard;