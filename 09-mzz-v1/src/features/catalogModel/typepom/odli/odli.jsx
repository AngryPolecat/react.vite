import { NumericFormat } from 'react-number-format'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './odli.module.css'
import { Icon } from '../../../../UI/icons/icon'
import { choiceOdli, setCurrentCountOdli } from './datasetOdliSlice'
import { InputUI } from '../../../../UI/input/input'
import { ODLI_LVL } from '../../../../const/const'

export const Odli = ({ odli }) => {
  let titleOdliLvl = ''
  const [count, setCount] = useState(Number(odli.currentCount))
  const [updateCountOdliInStore, setUpdateCountOdliInStore] = useState(false)
  const preSaveCount = odli.cnt
  const tarif = Number(odli.tarif * count)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setCount(Number(odli.currentCount))
  }, [Number(odli.currentCount)])

  useEffect(() => {
    if (updateCountOdliInStore) {
      dispatch(setCurrentCountOdli({ id: odli.id, count }))
      setUpdateCountOdliInStore(false)
    }
  }, [updateCountOdliInStore])

  const handlerChoiceOdli = (id) => {
    dispatch(choiceOdli(id))
  }

  const handlerChangeCountOdli = ({ target }, setFunc, old) => {
    const v = +target.value
    if (typeof v === 'number' && !isNaN(v)) {
      setFunc(target.value)
      setUpdateCountOdliInStore(true)
    }
  }

  switch (odli.lvl) {
    case ODLI_LVL.PDR_LVL:
      titleOdliLvl = 'Тариф от подразделения'
      break
    case ODLI_LVL.LPU_LVL:
      titleOdliLvl = 'Тариф от ЛПУ'
      break
    case ODLI_LVL.GLOBAL_LVL:
      titleOdliLvl = 'Глобальный тариф'
      break
    default:
  }

  return (
    <div className={styles.container}>
      <div className={styles.choiceOdli}>
        <Icon
          type={odli.choice ? 'fa-check-square-o' : 'fa-square-o'}
          size="fa-1x"
          title={odli.choice ? 'В подборе' : ''}
          icon={odli.choice ? 'icon-ksg-choice-yes' : 'icon-ksg-choice-no'}
          onclick={() => handlerChoiceOdli(odli.id)}
        />
      </div>
      <div className={styles.grp}>
        {odli.description} [{odli.grp}]
      </div>
      <div className={styles.usl}>
        {odli.usl} {odli.obst !== '0' && ` [${odli.obst}]`}
      </div>
      <div className={styles.description}>
        {odli.uslName} {odli.obst !== '0' && ` [${odli.obstName}]`}
      </div>
      <div className={styles.info}>
        {odli.status === 'remove' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Помечен на удаление" icon="icon-marked-remove" />}
        {odli.status === 'update' && <Icon type="fa-exclamation-triangle" size="fa-1x" title={`Произошли изменения:\n ${preSaveCount} -> ${count}`} icon="icon-marked-remove" />}
        {odli.status === 'new' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Новый элемент" icon="icon-marked-new" />}
      </div>
      <div className={styles.tarif}>
        <Icon type="fa-info-circle" size="fa-1x" title={`Тариф: ${odli.tarif}\n${titleOdliLvl}`} icon="icon-info" />
      </div>
      <div className={styles.total}>
        <div className={styles.totalInfo}>
          <InputUI variant="input-count-ksg" onchange={(e) => handlerChangeCountOdli(e, setCount, preSaveCount)} value={count} placeholder="Количество" />
          <span className={styles.totalRub}>
            <NumericFormat value={tarif.toFixed(2)} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
          </span>
        </div>
      </div>
      {/* <div className={styles.count}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeCountOdli(e, setCount, preSaveCount)} value={count} placeholder="Количество" />
      </div> */}
    </div>
  )
}
