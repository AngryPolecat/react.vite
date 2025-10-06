import styles from './button.module.css'

export const Button = ({ children, onclick }) => {
  return (
    <button className={styles.button} onClick={onclick}>
      {children}
    </button>
  )
}
