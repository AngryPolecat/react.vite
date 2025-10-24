import styles from './dropMenu.module.css'

export const DropMenu = ({ type, children }) => {
  return <div className={styles[type]}>{children}</div>
}
