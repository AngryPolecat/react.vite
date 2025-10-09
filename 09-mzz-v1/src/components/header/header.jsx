import { useSelector } from 'react-redux'
import styles from './header.module.css'
import logo from '../../assets/logo.png'
import { UserPanel } from '../../features/userPanel/userPanel'

export const Header = () => {
  const currentToken = useSelector((state) => state.currentUser.token)

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />
      {currentToken && <UserPanel />}
    </div>
  )
}
