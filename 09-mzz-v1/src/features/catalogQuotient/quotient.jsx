import { useDispatch } from 'react-redux'
import { Icon } from '../../UI/icons/icon'
import styles from './quotient.module.css'
import { choiceQuotient } from './listQuotientSlice'

export const Quotient = ({ quotient }) => {
  const dispatch = useDispatch()

  const handlerChoiceQuotient = (ksg) => {
    dispatch(choiceQuotient(ksg))
  }

  return (
    <div className={styles.container}>
      <div className={styles.choiceQuotient}>
        <Icon
          type={quotient.choice ? 'fa-check-square-o' : 'fa-square-o'}
          size="fa-1x"
          title={quotient.choice ? 'В подборе' : ''}
          icon={quotient.choice ? 'icon-ksg-choice-yes' : 'icon-ksg-choice-no'}
          onclick={() => handlerChoiceQuotient(quotient.ksg)}
        />
      </div>
      <div className={`${styles.fed} ${quotient.status === 'remove' ? styles.remove : ''} ${quotient.status === 'new' ? styles.newKsg : ''}`}>{quotient.fed}</div>
      <div className={styles.description}>
        <div>{quotient.name}</div>
        <div>
          {quotient.description} ({quotient.grp})
        </div>
      </div>
      <div className={styles.koz}>{quotient.koz}</div>
      <div className={styles.upr}>{quotient.upr}</div>
      <div className={styles.dzp}>{quotient.dzp}</div>
    </div>
  )
}
