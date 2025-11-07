import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../UI/icons/icon'
import styles from './filterPanel.module.css'
import { toggleFilterPanel } from '../../optionsSlice'

export const FilterPanel = ({ children }) => {
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const dispatch = useDispatch()

  const handlerShowPanel = () => {
    dispatch(toggleFilterPanel())
  }

  return (
    <div className={`${styles.container} ${!filterPanel ? styles.hidden : styles.visible} `}>
      <div className={styles.icons}>
        {/* <Icon type="fa-filter" size="fa-2x" title="Фильтры" icon="white-icon" /> */}
        <Icon type={!filterPanel ? 'fa-angle-double-right' : 'fa-angle-double-left'} size="fa-2x" title={!filterPanel ? 'Показать' : 'Скрыть'} icon="button-panel-filter" onclick={handlerShowPanel} />
      </div>
      <div>{children}</div>
    </div>
  )
}
