import styles from './auth.module.css'
import { InputUI } from '../../UI/input/input'
import { Button } from '../../UI/buttons/button'
import { useState } from 'react'
import { AuthListCrt } from './authListCrt'
import { createListCrt } from '../../utils/getListCrt'

export const Auth = () => {
  const [showCrt, setShowCrt] = useState(false)
  const [listCrt, setListCrt] = useState([])
  const [error, setErrorMessage] = useState('')

  const handlerEnterPsw = () => {
    console.log(1)
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
      <InputUI placeholder="Имя пользователя" type="text" />
      <InputUI placeholder="Пароль" type="password" />
      <div className={styles.authButtonsBox}>
        <Button onclick={handlerEnterPsw}>Войти</Button>
        <Button onclick={handlerEnterCrt}>По сертификату</Button>
      </div>
      {showCrt ? <AuthListCrt listCrt={listCrt} /> : null}
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  )
}
