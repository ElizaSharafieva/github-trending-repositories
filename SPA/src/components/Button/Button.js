import styles from './styles.module.scss'

const Button = ({ onClick, setLoading, loading, src, alt }) => {

  return (
    <button 
      type='button'
      className={styles.button} 
      onClick={onClick}
      onAnimationEnd={() => setLoading(0)}
      loading={loading}
    >
      <img className={styles.image} src={src} alt={alt}/>
    </button>
  )
}

export default Button