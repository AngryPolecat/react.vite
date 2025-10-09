import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './auth.module.css'
import { InputUI } from '../../UI/input/input'
import { Button } from '../../UI/buttons/button'
import { useEffect, useState } from 'react'
import { AuthListCrt } from './authListCrt'
import { createListCrt } from '../../utils/getListCrt'
import { URL_AUTH, MIN_LENGTH_LOGIN, MIN_LENGTH_PASS } from '../../const/const'
import { loaderData } from '../../utils/loaderData'
import { clearCurrentUser, setCurrentUser } from './currentUserSlice'

export const Auth = () => {
  const [authType, setAuthType] = useState(null)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [dataCrt, setDataCrt] = useState({})
  const [showCrt, setShowCrt] = useState(false)
  const [listCrt, setListCrt] = useState([])
  const [error, setErrorMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (authType) {
      const data =
        authType === 'psw'
          ? { type: 'psw', login, password }
          : { type: 'crt', thumb: dataCrt.thumb, subject: dataCrt.subject, fromDate: dataCrt.fromDate, toDate: dataCrt.toDate, issuer: dataCrt.issuer }
      loaderData(URL_AUTH, data)
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.msg)
            return
          }
          dispatch(setCurrentUser({ token: data.token, fio: data.user }))
          navigate('/')
        })
        .catch((error) => setErrorMessage(error.message))
        .finally(() => {
          setAuthType(null)
        })
    }
  }, [authType])

  const handlerEnterPsw = () => {
    if (login.trim().length < MIN_LENGTH_LOGIN || password.trim().length < MIN_LENGTH_PASS) {
      setShowCrt(false)
      if (login.trim().length < MIN_LENGTH_LOGIN) {
        setErrorMessage(`Длина логина не может быть меньше ${MIN_LENGTH_LOGIN} символов`)
      } else {
        setErrorMessage(`Длина пароля не может быть меньше ${MIN_LENGTH_PASS} символов`)
      }
    } else {
      setAuthType('psw')
      setErrorMessage('')
    }
  }

  const handlerEnterCrt = () => {
    setErrorMessage('')
    setListCrt([])
    setShowCrt((prev) => !prev)
    if (!showCrt) {
      createListCrt({ setList: setListCrt, setError: setErrorMessage })
    }
  }

  return (
    <div className={styles.authBox}>
      <h2>&#128274; Авторизация</h2>
      <InputUI placeholder="Имя пользователя" type="text" value={login} onchange={({ target }) => setLogin(target.value)} />
      <InputUI placeholder="Пароль" type="password" value={password} onchange={({ target }) => setPassword(target.value)} />
      <div className={styles.authButtonsBox}>
        <Button onclick={handlerEnterPsw}>Войти</Button>
        <Button onclick={handlerEnterCrt}>По сертификату</Button>
      </div>
      {showCrt && !error ? <AuthListCrt listCrt={listCrt} setError={setErrorMessage} setDate={setDataCrt} setAuth={setAuthType} /> : null}
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  )
}
