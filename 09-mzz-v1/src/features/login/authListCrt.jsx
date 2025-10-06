import styles from './authListCrt.module.css'

export const AuthListCrt = ({ listCrt }) => {
  console.log(listCrt)

  return (
    <div className={styles.listCrt}>
      {listCrt.map((crt) => (
        <div className={styles.crt} key={crt.id}>
          <span>Фио: {crt.fio}</span>
          <span>Действует: {crt.valid}</span>
          <span>Выдал: {crt.issuer}</span>
          <span>Хэш: {crt.thumb}</span>
        </div>
      ))}
    </div>
  )
}
