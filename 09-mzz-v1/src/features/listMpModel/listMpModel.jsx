import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { FilterListMpModel } from './filterListMpModel'
import styles from './listMpModel.module.css'
import { ListMp } from './listMp'
import { ListDepartment } from './listDepartment'
import { closeFilterPanel } from '../../optionsSlice'
import { SelectedVariant } from './selectedVariant'

export const ListMpModel = () => {
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const nameLpu = useSelector((state) => state.listLpu.currentLpu.name)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlerClickBack = () => {
    dispatch(closeFilterPanel())
    navigate(-1)
  }

  return (
    <div className={styles.container}>
      <div>
        <FilterPanel>{filterPanel && <FilterListMpModel />}</FilterPanel>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.description}>
            <span className={styles.back} onClick={handlerClickBack}>
              Вернуться
            </span>
            <span>|</span>
            <span>{nameLpu}</span>
          </div>
        </div>
        <div className={styles.work}>
          <div className={styles.listTypepom}>
            <ListMp />
          </div>
          <div className={styles.listDepartment}>
            <ListDepartment />
          </div>
          <div className={styles.selectedVariant}>
            <SelectedVariant />
          </div>
          <div className={styles.possibleVariant}>Список возможных вариантов</div>
        </div>
      </div>
    </div>
  )
}
