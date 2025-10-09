import styles from './authListCrt.module.css'
import { checkPrivateKey } from '../../utils/getListCrt'

export const AuthListCrt = ({ listCrt, setError, setDate, setAuth }) => {
  return (
    <div className={styles.listCrt}>
      {listCrt.map((crt) => (
        <div className={styles.crt} key={crt.id} onClick={() => checkPrivateKey(crt, setError, setDate, setAuth)}>
          <span>Фио: {crt.fio}</span>
          <span>Действует: {crt.valid}</span>
          <span>Выдал: {crt.issuer}</span>
          <span>Хэш: {crt.thumb}</span>
        </div>
      ))}
    </div>
  )
}
