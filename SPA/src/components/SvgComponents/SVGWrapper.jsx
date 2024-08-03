import styles from './styles.module.scss'

const SVGWrappepr = (props) => {
  const {
    children
  } = props

  return(
    <div className={styles.svgWrapper}>
      {children}
    </div>
  )
}

export default SVGWrappepr