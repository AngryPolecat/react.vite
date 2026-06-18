import { useDispatch } from 'react-redux'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from '../../UI/icons/icon'
import styles from './quotient.module.css'
import { choiceQuotient, setCurrentQuotient } from './listQuotientSlice'
import { InputUI } from '../../UI/input/input'

export const Quotient = memo(({ quotient }) => {
  const [koz, setKoz] = useState(Number(quotient.currentKoz))
  const [upr, setUpr] = useState(Number(quotient.currentUpr))
  const [dzp, setDzp] = useState(Number(quotient.currentDzp))
  const [updateQuotientInStore, setUpdateQuotientInStore] = useState(false)
  const preSaveKoz = quotient.koz
  const preSaveUpr = quotient.upr
  const preSaveDzp = quotient.dzp
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setKoz(Number(quotient.currentKoz))
    setUpr(Number(quotient.currentUpr))
    setDzp(Number(quotient.currentDzp))
  }, [Number(quotient.currentKoz), Number(quotient.currentUpr), Number(quotient.currentDzp)])

  useEffect(() => {
    if (updateQuotientInStore) {
      dispatch(setCurrentQuotient({ ksg: quotient.ksg, koz, upr, dzp }))
      setUpdateQuotientInStore(false)
    }
  }, [updateQuotientInStore])

  const handlerChoiceQuotient = (ksg) => {
    dispatch(choiceQuotient(ksg))
  }

  const handlerChangeQuotient = ({ target }, setFunc, old) => {
    const kf = +target.value
    if (typeof kf === 'number' && !isNaN(kf)) {
      setFunc(target.value)
      setUpdateQuotientInStore(true)
    }
  }

  // console.log(oldKoz)

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
      <div className={styles.fed}>{quotient.fed}</div>
      <div className={styles.description}>
        <div>{quotient.name}</div>
        <div>
          {quotient.description} ({quotient.grp})
        </div>
      </div>
      <div className={styles.info}>
        {(Number(koz) !== Number(preSaveKoz) || Number(upr) !== Number(preSaveUpr) || Number(dzp) !== Number(preSaveDzp)) && (
          <Icon
            type="fa-exclamation-triangle"
            size="fa-1x"
            title={`Произошли изменения:\nКЗ ${preSaveKoz} -> ${koz}\nУК ${preSaveUpr} -> ${upr}\nДЗП ${preSaveDzp} -> ${dzp}`}
            icon="icon-marked-remove"
          />
        )}
      </div>
      <div className={styles.koz}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeQuotient(e, setKoz, preSaveKoz)} value={koz} placeholder="Коэффициент затратоемкости" />
      </div>
      <div className={styles.upr}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeQuotient(e, setUpr, preSaveUpr)} value={upr} placeholder="Упревленческий коэффициент" />
      </div>
      <div className={styles.dzp}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeQuotient(e, setDzp, preSaveDzp)} value={dzp} placeholder="Доля заработной платы" />
      </div>
      {/* <div className={styles.saveQuotient}>
        {quotient.status === 'update' && <Icon type="fa fa-floppy-o" size="fa-1x" title="Сохранить?" icon="icon-ksg-choice-yes" onclick={() => handlerChoiceQuotient(quotient.ksg)} />}
      </div> */}
    </div>
  )
})
