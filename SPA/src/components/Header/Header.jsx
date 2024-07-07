import axios from "axios"
import { useState } from "react";
import styles from './styles.module.scss'
import update from '../../images/update.svg'
import Button from "../Button/Button";

function Header({ onSync }) {

  const [loading, setLoading] = useState(0);

  const handleStartSync = async () => {
    try {
      setLoading(1)
      const response = await axios(`https://github-trending-repositories-phi.vercel.app/sync/force`)
      console.log(response.data.message)
      await onSync()
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <header className={styles.header}> 
      <div>
        <h1 className={styles.header__title}>Тренды GitHub за cегодня</h1>
        <p className={styles.header__text}>Популярные GitHub репозитории за сегодня. Рейтинг обновляется каждые 12 часов.</p>
      </div>
      <Button onClick={handleStartSync} setLoading={setLoading} loading={loading} src={update} alt={'иконка обновления'}/>
    </header>
  )
}

export default Header