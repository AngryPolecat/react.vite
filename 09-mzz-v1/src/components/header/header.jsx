import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './header.module.css'
import logo from '../../assets/logo.png'
import { UserPanel } from '../../features/userPanel/userPanel'
import { loaderData } from '../../utils/loaderData'
import { URL } from '../../const/const'
import { setCurrentUser } from '../../features/login/currentUserSlice'

export const Header = () => {
  const currentToken = useSelector((state) => state.currentUser.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!currentToken) {
      const browserToken = localStorage.getItem('token')
      if (browserToken) {
        const data = { token: browserToken }
        loaderData(URL.URL_CHECK_SESSION, data)
          .then((result) => {
            if (!result.valid) {
              localStorage.removeItem('token')
              navigate('/login')
            }
            dispatch(setCurrentUser({ token: result.token, fio: result.user, session: result.session }))
            location.pathname === '/login' && navigate('/')
          })
          .catch((error) => {
            console.log(error.message)
          })
      } else {
        navigate('/login')
      }
    }
  }, [])

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo} />
      {currentToken && <UserPanel />}
    </div>
  )
}
