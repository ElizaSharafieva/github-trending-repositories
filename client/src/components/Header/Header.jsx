import styles from './styles.module.scss'

function Header() {
  return (
    <header> 
      <h1 className={styles.header__title}>Тренды GitHub за cегодня</h1>
      <p className={styles.header__text}>Популярные GitHub репозитории за сегодня. Рейтинг обновляется каждые 12 часов.</p>
    </header>
  )
}

export default Header