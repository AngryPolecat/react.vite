import styles from './icon.module.css'

export const Icon = ({ type, size, title, onclick, icon = 'standart' }) => {
  return (
    <div className={styles[icon]}>
      <i className={`fa ${type} ${size}`} aria-hidden="true" title={title} onClick={onclick}></i>
    </div>
  )
}
