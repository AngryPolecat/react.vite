import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { FilterCatalogModel } from './filterCatalogModel'
import styles from './catalogModel.module.css'
import { ListTypepom } from './listTypepom'
import { ListDepartment } from './listDepartment'
import { closeFilterPanel, toggleExtraPanel } from '../../optionsSlice'
import { DatasetModel } from './datasetModel'
import { RightPanel } from '../../components/rightPanel/rightPanel'
import { Variants } from './variants'

export const CatalogModel = () => {
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
        <FilterPanel>{filterPanel && <FilterCatalogModel />}</FilterPanel>
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
            <ListTypepom />
          </div>
          <div className={styles.listDepartment}>
            <ListDepartment />
          </div>
          <div className={styles.selectedVariant}>
            <DatasetModel />
          </div>
          <div className={styles.extraPanel}>{extraPanel && <RightPanel header="Добавить вариант">{<Variants />}</RightPanel>}</div>
        </div>
      </div>
    </div>
  )
}
