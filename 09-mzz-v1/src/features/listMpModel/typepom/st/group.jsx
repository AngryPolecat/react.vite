import styles from './group.module.css'

export const Group = ({ grp, onclick }) => {
  return (
    <div className={styles.container} onClick={onclick}>
      <div className={styles.number}>{grp.kd_gr_ksg}</div>
      <div className={styles.description}>{grp.name}</div>
    </div>
  )
}
