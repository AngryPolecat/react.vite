import { useDispatch, useSelector } from 'react-redux'
import styles from './modalWin.module.css'
import { Icon } from '../../UI/icons/icon'
import { toggleStatusModalWin } from '../../optionsSlice'

export const ModalWin = ({ children, header = 'Заголовок окна', text = 'Какой то текст модального окна' }) => {
  const statusModalWin = useSelector((state) => state.options.statusModalWin)
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      {statusModalWin && (
        <div className={styles.backing}>
          <div className={styles.win}>
            <div className={styles.header}>
              <div className={styles.textHeader}>{header}</div>
              <Icon type="fa-times" size="fa-1x" title="Закрыть" icon="icon-close-modal-win" onclick={(e) => dispatch(toggleStatusModalWin(false))} />
            </div>
            <div className={styles.text}>{text}</div>
            <div className={styles.buttons}>
              <div>Кнопка 1</div>
              <div>Кнопка 2</div>
              <div>Кнопка 3</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
