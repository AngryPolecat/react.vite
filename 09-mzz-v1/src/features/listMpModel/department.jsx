import { useSelector } from 'react-redux'
import styles from './department.module.css'

export const Department = ({ department, onclick }) => {
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.id)

  return (
    <li className={`${styles.container} ${department.id === currentDepartment && styles.active}`} key={department.id} onClick={onclick}>
      {department.name}
    </li>
  )
}
