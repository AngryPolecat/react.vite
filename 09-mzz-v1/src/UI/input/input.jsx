import styles from './input.module.css'

export const InputUI = ({ text, placeholder, type }) => {
  return <input className={styles.input} value={text} placeholder={placeholder} type={type} autoComplete="false" />
}
