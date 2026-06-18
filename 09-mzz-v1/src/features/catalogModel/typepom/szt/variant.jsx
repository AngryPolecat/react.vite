import styles from './variant.module.css'

export const Variant = ({ variant, onclick }) => {
  return (
    <li className={styles.container}>
      <div className={styles.variant} onClick={onclick}>
        <div className={styles.variantFed}>{variant.fed}</div>
        <div className={styles.variantName}>{variant.name}</div>
      </div>
    </li>
  )
}
