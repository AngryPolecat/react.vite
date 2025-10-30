import styles from './input.module.css'

export const InputUI = ({ placeholder, type, value, onchange, variant = 'input', disabled = false }) => {
  return <input className={styles[variant]} value={value} placeholder={placeholder} type={type} autoComplete="off" onChange={onchange} disabled={disabled} />
}
