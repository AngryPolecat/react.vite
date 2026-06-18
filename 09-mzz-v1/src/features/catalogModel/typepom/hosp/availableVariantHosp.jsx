import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import styles from './availableVariantHosp.module.css'
import { InputUI } from '../../../../UI/input/input'
import { Variant } from './variant'
import { closeMessage, showMessage } from '../../../../optionsSlice'
import { SETTINGS, WARNING_MESSAGE } from '../../../../const/const'
import { addKsgToDataset } from './datasetHospSlice'

export const AvailableVariantHosp = () => {
  const [textKsg, setTextKsg] = useState('')
  const variants = useSelector((state) => state.datasetHosp.variants)
  const dataset = useSelector((state) => state.datasetHosp.dataset)
  const currentGroup = useSelector((state) => state.datasetHosp.currentGroup)
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu)
  const dispatch = useDispatch()

  const handlerAddVariant = (variant) => {
    if (!currentDepartment.code) {
      dispatch(showMessage(WARNING_MESSAGE('Ошибка. Юридическое лицо.')))
      setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      return
    }
    if (!currentDepartment.lvl && !currentLpu.lvl) {
      dispatch(showMessage(WARNING_MESSAGE('Ошибка. Отсутствует уровень подразделения.')))
      setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      return
    }
    const newKsg = {
      id: uuidv4(),
      lvl: currentDepartment.lvl || currentLpu.lvl,
      ksg: variant.ksg,
      fed: variant.fed,
      name: variant.name,
      grp: variant.grp,
      description: variant.description,
      modelDate: currentModel.created,
      adult: 0,
      child: 0,
      total: 0,
      adultRub: 0,
      childRub: 0,
      totalRub: 0,
      dstart: variant.dstart,
      dstop: variant.dstop,
      choice: false,
      status: 'new',
      showMenu: false,
      currentAdult: 0,
      currentChild: 0,
      koz: variant.koz,
      upr: variant.upr,
      dzp: variant.dzp,
      klvl: currentDepartment.klvl || currentLpu.klvl,
      bs: currentDepartment.bs || currentLpu.bs,
      kd: currentDepartment.kd || currentLpu.kd,
      formula: variant.formula,
      usedLvl: variant.usedLvl,
    }
    dispatch(addKsgToDataset(newKsg))
  }

  const handlerChangeFilter = ({ target }) => {
    setTextKsg(target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e)} value={textKsg} placeholder="Часть кода КСГ или названия" />
      </div>
      <div className={styles.listVariant}>
        <ul>
          {variants.map((variant) => {
            const alreadySelected = dataset.findIndex((itemDataset) => itemDataset.fed === variant.fed)
            return (
              alreadySelected === -1 &&
              (!textKsg || (textKsg && (variant.fed.toLowerCase().includes(textKsg.toLowerCase()) || variant.name.toLowerCase().includes(textKsg.toLowerCase())))) &&
              (!currentGroup || (currentGroup && Number(currentGroup) === Number(variant.grp))) && <Variant key={variant.id} variant={variant} onclick={() => handlerAddVariant(variant)} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
