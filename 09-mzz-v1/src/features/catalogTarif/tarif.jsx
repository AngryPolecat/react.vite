import { NumericFormat } from 'react-number-format'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from '../../UI/icons/icon'
import styles from './tarif.module.css'
import { InputUI } from '../../UI/input/input'
import { useDispatch } from 'react-redux'
import { choiceTarif, setCurrentTarif } from './listTarifSlice'

export const Tarif = ({ tarif }) => {
  const [cost, setCost] = useState(Number(tarif.currentCost))
  const [updateTarifInStore, setUpdateTarifInStore] = useState(false)
  const preSaveTarif = tarif.cost
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setCost(Number(tarif.currentCost))
  }, [Number(tarif.currentCost)])

  useEffect(() => {
    if (updateTarifInStore) {
      dispatch(setCurrentTarif({ id: tarif.idTarif, cost }))
      setUpdateTarifInStore(false)
    }
  }, [updateTarifInStore])

  const handlerChoiceTarif = (id) => {
    dispatch(choiceTarif(id))
  }

  const handlerChangeTarif = ({ target }, setFunc, old) => {
    const v = +target.value
    if (typeof v === 'number' && !isNaN(v)) {
      setFunc(target.value)
      setUpdateTarifInStore(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.choiceTarif}>
        <Icon
          type={tarif.choice ? 'fa-check-square-o' : 'fa-square-o'}
          size="fa-1x"
          title={tarif.choice ? 'В подборе' : ''}
          icon={tarif.choice ? 'icon-ksg-choice-yes' : 'icon-ksg-choice-no'}
          onclick={() => handlerChoiceTarif(tarif.idTarif)}
        />
      </div>
      <div className={styles.grp}>
        {tarif.description} [{tarif.grp}]
      </div>
      <div className={styles.usl}>
        {tarif.usl} {tarif.obst !== '0' && ` [${tarif.obst}]`}
      </div>
      <div className={styles.description}>
        {tarif.uslName} {tarif.obst !== '0' && ` [${tarif.obstName}]`}
      </div>
      <div className={styles.info}>
        {tarif.status === 'remove' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Помечен на удаление" icon="icon-marked-remove" />}
        {tarif.status === 'update' && <Icon type="fa-exclamation-triangle" size="fa-1x" title={`Произошли изменения:\nТариф ${preSaveTarif} -> ${cost}`} icon="icon-marked-remove" />}
        {tarif.status === 'new' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Новый элемент" icon="icon-marked-new" />}
      </div>
      <div className={styles.tarif}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeTarif(e, setCost, preSaveTarif)} value={cost} placeholder="Тариф" />
      </div>
    </div>
  )
}
