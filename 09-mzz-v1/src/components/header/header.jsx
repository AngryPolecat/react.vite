import styles from './header.module.css'
import logo from '../../assets/logo.png'

export const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />
    </div>
  )
}
