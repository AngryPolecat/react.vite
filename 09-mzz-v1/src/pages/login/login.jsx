import { Auth } from '../../features/login/auth'
import styles from './login.module.css'

export const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <Auth />
    </div>
  )
}
