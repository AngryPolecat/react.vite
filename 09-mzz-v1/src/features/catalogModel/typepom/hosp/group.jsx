import styles from './group.module.css'

export const Group = ({ group, onclick }) => {
  //${group.status === 'new' ? styles.newGrp : ''}
  return (
    <div className={`${styles.container} ${group.status === 'new' ? styles.newGrp : ''}`} onClick={onclick}>
      <div className={styles.number}>{group.grp}</div>
      <div className={styles.description}>{group.description}</div>
    </div>
  )
}
