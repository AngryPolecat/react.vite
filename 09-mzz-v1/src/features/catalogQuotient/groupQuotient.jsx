import styles from './groupQuotient.module.css'

export const GroupQuotient = ({ grp, onclick }) => {
  return (
    <div className={styles.container} onClick={onclick}>
      <div className={styles.number}>{grp.grp}</div>
      <div className={styles.description}>{grp.description}</div>
    </div>
  )
}
