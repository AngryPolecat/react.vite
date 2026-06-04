import { useDispatch, useSelector } from 'react-redux'
import { DropList } from '../../UI/droplists/droplists'
import styles from './filterListModels.module.css'
import { changeCurrentYear } from '../../listsSlice'

export const FilterListModels = () => {
  const dispatch = useDispatch()
  const listYears = useSelector((state) => state.lists.years)
  const currentYear = useSelector((state) => state.lists.currentYear)

  const selectCurrentYear = (item) => {
    dispatch(changeCurrentYear(item))
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>Год</div>
        <DropList list={listYears} current={currentYear} onchange={selectCurrentYear} />
      </div>
    </div>
  )
}
