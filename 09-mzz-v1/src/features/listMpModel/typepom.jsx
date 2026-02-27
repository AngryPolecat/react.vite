import { useSelector } from 'react-redux'
import styles from './typepom.module.css'

export const Typepom = ({ typepom, onclick }) => {
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)

  return (
    <li className={`${styles.container} ${typepom.code === currentTypepom && styles.active}`} key={typepom.code} onClick={onclick}>
      {typepom.description}
    </li>
  )
}
