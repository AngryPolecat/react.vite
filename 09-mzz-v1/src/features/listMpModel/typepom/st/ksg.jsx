import styles from './ksg.module.css'

export const Ksg = ({ ksg }) => {
  return (
    <div className={styles.container}>
      <div className={styles.fed}>{ksg.fed}</div>
      <div className={styles.description}>
        <div>{ksg.name}</div>
        <div>
          {ksg.grp} ({ksg.kd_gr_ksg})
        </div>
      </div>
      <div className={styles.lvl}>{ksg.lvl}</div>
      <div className={styles.adult}>
        <div>{ksg.q_ad}</div>
        <div>{ksg.st_ad}</div>
      </div>
      <div className={styles.child}>
        <div>{ksg.q_ch}</div>
        <div>{ksg.st_ch}</div>
      </div>
      <div className={styles.total}>
        <div>{ksg.q_il}</div>
        <div>{ksg.st_all}</div>
      </div>
      <div className={styles.warning}></div>
    </div>
  )
}
