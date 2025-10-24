import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './userPanel.module.css'
import unknown from '../../assets/unknown.png'
import { Icon } from '../../UI/icons/icon'
import { clearCurrentUser } from '../login/currentUserSlice'

export const UserPanel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerExit = () => {
    dispatch(clearCurrentUser())
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={styles.panel}>
      <div>
        <img className={styles.face} src={unknown}></img>
      </div>
      <div>
        <div className={styles.info}>Миловидов Виталий Валерьевич</div>
        <div className={styles.buttons}>
          <Icon type="fa-home" size="fa-3x" title="На главную страницу" />
          <Icon type="fa-cogs" size="fa-3x" title="Настройки пользователя" />
          <Icon type="fa-sign-out" size="fa-3x" title="Выход из системы" onclick={handlerExit} />
        </div>
      </div>
    </div>
  )
}
