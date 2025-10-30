import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../UI/icons/icon'
import styles from './rightPanel.module.css'
import { toggleExtraPanel } from '../../optionsSlice'

export const RightPanel = ({ header, children }) => {
  const extraPanel = useSelector((state) => state.options.extraPanel)
  const dispatch = useDispatch()

  const handlerCloseTab = () => {
    dispatch(toggleExtraPanel(false))
  }

  return (
    <div className={`${styles.container} ${extraPanel ? styles.active : styles.hidden}`}>
      <div className={styles.header}>
        <div className={styles.nameTab}>{header}</div>
        <Icon type="fa-times" size="fa-1x" title="Закрыть" icon="icon-close" onclick={handlerCloseTab} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
