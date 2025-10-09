import styles from './input.module.css'

export const InputUI = ({ placeholder, type, value, onchange }) => {
  return <input className={styles.input} value={value} placeholder={placeholder} type={type} autoComplete="off" onChange={onchange} />
}
