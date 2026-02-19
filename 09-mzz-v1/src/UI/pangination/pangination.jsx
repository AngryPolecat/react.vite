import { Icon } from '../icons/icon'
import styles from './pangination.module.css'

export const Pangination = ({ pages, current, onClickPrev, onClickNext }) => {
  //   console.log(pages)

  return (
    <div className={styles.container}>
      {current > 1 ? (
        <Icon type="fa-chevron-circle-left" size="fa-2x" title="Предыдущая страница" icon="icon-pangination-active" onclick={onClickPrev} />
      ) : (
        <Icon type="fa-chevron-circle-left" size="fa-2x" title="Предыдущая страница" icon="icon-pangination" />
      )}
      <div className={styles.page}>{current}</div>
      {current < pages ? (
        <Icon type="fa-chevron-circle-right" size="fa-2x" title="Следующая страница" icon="icon-pangination-active" onclick={onClickNext} />
      ) : (
        <Icon type="fa-chevron-circle-right" size="fa-2x" title="Следующая страница" icon="icon-pangination" />
      )}
    </div>
  )
}
