import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss';

function SearchForm({ value, setValue, setRepo }) {
  
  const navigate = useNavigate();

  function handleChangeValue(evt) {
    setValue(evt.target.value);
  };

  const handleSearchRepo = async function() {
    if (value) {
      navigate(`/repositories/${value}`, { replace: true });
      setValue('')
    }
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
          placeholder={"Введите название репозитория или id"}
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