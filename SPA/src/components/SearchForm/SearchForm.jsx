import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './styles.module.scss';

function SearchForm({ value, setValue, setRepo }) {
  
  // const [value, setValue] = useState('');
  // const [repo, setRepo] = useState({});
  // const [cursor, setCursor] = useState(0);
  const [placeholder, setPlaceholder] =  useState('Введите название репозитория или id');
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const cityName = useSelector(state => state.city.cityName);

  function handleChangeValue(evt) {
    setValue(evt.target.value);
  };

  // useEffect(() => {
  //   if (value) {
  //     props.searchCities(value, 5)
  //     .then(cities => cities ? setСities(cities) : setСities([]))
  //   }
  // }, [value, props])

  // useEffect(() => {
  //   if (!cityName || cityName === 'Москва') 
  //   props.getCurrentPosition()
  // }, [])



  // function handleAddCity() {
  //   dispatch(setCurrentCity(cities[cursor]))
  //   setValue('');
  //   setСities([]);
  // }



  // const searchCities = async function(city, count) {

  //   try {
  //     const response = await api.post(
  //       `https://nodejs-serverless-function-express-six-indol.vercel.app/search?name=${city}&count=${count}`,
  //       // `http://localhost:3000/search?name=${city}&count=${count}`,
  //        {city, count}, signal)
  //     const cities = await response.results;
  //     return cities
  //   } catch(err) {
  //     console.log(err);
  //   }
  // } 

  const handleSearchRepo = async function() {
    if (value) {
      // const response = await axios.get(`http://localhost:3000/repositories/${value}`)
      // console.log(response.data)
      // setRepo(response.data)
      navigate(`/repositories/${value}`, { replace: true });
      setValue('')
    }
   



      // props.searchCities(value, 5)
      //   .then (res => {if (!res) setValue('')})
      //   .then (setPlaceholder('Город не найден'))
  }

  return (
    <form className={styles.searchForm} onSubmit={evt => evt.preventDefault()}>
      <div className={styles.searchForm__container}>
        <button 
          className={styles.searchForm__button} 
          type='submit'
          onClick={handleSearchRepo}
        >
        </button>
        <input
          className={styles.searchForm__input}
          type='text' 
          placeholder={placeholder}
          id="search-input"
          name="search-input"
          onChange={handleChangeValue}
          value={value}
        >
        </input>
      </div>
    </form>
  );
}

export default SearchForm;