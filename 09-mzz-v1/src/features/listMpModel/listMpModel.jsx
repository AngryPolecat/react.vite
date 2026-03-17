import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { FilterListMpModel } from './filterListMpModel'
import styles from './listMpModel.module.css'
import { ListMp } from './listMp'
import { ListDepartment } from './listDepartment'
import { closeFilterPanel, toggleExtraPanel } from '../../optionsSlice'
import { SelectedVariant } from './selectedVariant'
import { RightPanel } from '../../components/rightPanel/rightPanel'
import { PossibleVariant } from './possibleVariant'

export const ListMpModel = () => {
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const nameLpu = useSelector((state) => state.listLpu.currentLpu.name)
  const extraPanel = useSelector((state) => state.options.extraPanel)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlerClickBack = () => {
    dispatch(closeFilterPanel())
    dispatch(toggleExtraPanel(false))
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
          <div className={styles.extraPanel}>{extraPanel && <RightPanel header="Добавить вариант">{<PossibleVariant />}</RightPanel>}</div>
        </div>
      </div>
    </div>
  )
}
