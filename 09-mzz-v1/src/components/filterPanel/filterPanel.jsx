import { useState } from 'react'
import { Icon } from '../../UI/icons/icon'
import styles from './filterPanel.module.css'

export const FilterPanel = () => {
  const [showPanel, setShowPanel] = useState(false)

  const handlerShowPanel = () => {
    setShowPanel((prev) => !prev)
  }

  return (
    <div className={`${styles.container} ${!showPanel ? styles.hidden : styles.visible} `}>
      <div className={styles.icons}>
        {/* <Icon type="fa-filter" size="fa-2x" title="Фильтры" icon="white-icon" /> */}
        <Icon type={!showPanel ? 'fa-angle-double-right' : 'fa-angle-double-left'} size="fa-2x" title={!showPanel ? 'Показать' : 'Скрыть'} icon="button-panel-filter" onclick={handlerShowPanel} />
      </div>
    </div>
  )
}
