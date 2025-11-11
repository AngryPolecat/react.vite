import styles from './text.module.css'

export const TextAreaUI = ({ placeholder, value, onchange, variant = 'standart' }) => {
  return (
    <div className={styles.textArea}>
      <textarea className={styles[variant]} placeholder={placeholder} autoComplete="off" onChange={onchange} rows="5" value={value} />
    </div>
  )
}
