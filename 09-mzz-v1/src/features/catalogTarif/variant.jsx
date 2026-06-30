import styles from './variant.module.css'

export const Variant = ({ variant, onclick }) => {
  return (
    <li className={styles.container}>
      <div className={styles.variant} onClick={onclick}>
        <div className={styles.variantCode}>
          {variant.usl} {variant.obst !== '0' && `+ ${variant.obst}`}
        </div>
        <div className={styles.variantUsl}>{variant.uslName}</div>
        {variant.obst !== '0' && <div className={styles.variantObst}>{variant.obstName}</div>}
      </div>
    </li>
  )
}
