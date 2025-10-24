import styles from './message.module.css'

export const Message = ({ type, children }) => {
  return <div className={styles[type]}>{children}</div>
}
