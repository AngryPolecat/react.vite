import styles from './text.module.css'

export const TextAreaUI = ({ placeholder, value, onchange, variant = 'standart' }) => {
  return (
    <div className={styles.textArea}>
      <textarea className={styles[variant]} value={value} placeholder={placeholder} autoComplete="off" onChange={onchange} rows="5"></textarea>
    </div>
  )
}
