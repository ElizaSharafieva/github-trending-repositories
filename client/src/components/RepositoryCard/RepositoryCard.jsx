import styles from './styles.module.scss'
import SVGWrappepr from '../SvgComponents/SVGWrapper'
import {ReactComponent as Svg} from '../../images/star-svgrepo-com.svg'
import avatar from '../../images/avatar.jpg'

function RepositoryCard() {

  return (
    <article className={styles.card}>
      <div>
        <a href="#" target="_blank" className={styles.card__title}>apple / <span className={styles.card__titleHiglight}>swift-testing</span></a>
        <p className={styles.card__description}>A modern, expressive testing package for Swift</p>
        <ul className={styles.card__list}>
          <li className={styles.card__listItem}>
            <SVGWrappepr>
              <Svg />
            </SVGWrappepr>
            1197
          </li>
          <li className={styles.card__listItem}>
            <SVGWrappepr>
            <Svg />
            </SVGWrappepr>
            59 Today
          </li>
        </ul>
      </div>
      <div className={styles.card__cardContainer}>
        <a href="#" target="_blank" className={styles.card__link}>
          <img className={styles.card__image} src={avatar} alt="иконка аватара" />
          <div className={styles.card__authorContainer}>
            <p>автор</p>
            <h2>Apple</h2>
          </div>
        </a>
      </div>
    </article>
  )
} 

 export default RepositoryCard;