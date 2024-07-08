import axios from "axios"
import { useState } from "react";
import styles from './styles.module.scss'
import update from '../../images/update.svg'
import Button from "../Button/Button";

function Header({ onSync, fetchNextSyncTime, lastUpdate }) {

  
  const APIURL = process.env.REACT_APP_API_URL

  const [loading, setLoading] = useState(0);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const formattedDate = formatter.format(lastUpdate);

  const handleStartSync = async () => {
    try {
      setLoading(1)
      const response = await axios(`${APIURL}/sync/force`)
      console.log(response.data.message)
      await onSync()
      await fetchNextSyncTime();
    } catch(err) {
      console.log(err)
    }
  };

  console.log(lastUpdate)

  return (
    <header className={styles.header}> 
      <div>
        <h1 className={styles.header__title}>Тренды GitHub за cегодня</h1>
        <p className={styles.header__text}>Популярные GitHub репозитории за сегодня. Рейтинг обновляется каждые 12 часов.</p>
        <p className={styles.header__text}>Последнее обновление: 
          {
            lastUpdate === '' ? '': formattedDate
          }
        </p>
      </div>
      <Button onClick={handleStartSync} setLoading={setLoading} loading={loading} src={update} alt={'иконка обновления'}/>
    </header>
  )
}

export default Header