import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './listVariants.module.css'
import { InputUI } from '../../UI/input/input'
import { Variant } from './variant'
import { addTarifToDataset } from './listTarifSlice'

export const ListVariants = () => {
  const [textVariant, setTextVariant] = useState('')
  const variants = useSelector((state) => state.listTarif.variants)
    .slice()
    .sort((a, b) => a.grp - b.grp || a.usl.localeCompare(b.usl))
  const tarif = useSelector((state) => state.listTarif.tarif)
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentDepartment = useSelector((state) => state.listTarif.currentDepartment)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu)
  const dispatch = useDispatch()

  const handlerAddVariant = (variant) => {
    const newTarif = {
      idTarif: variant.idTarif,
      mcod: Object.keys(currentLpu).length === 0 ? 0 : currentLpu.mcod,
      ateLpu: Object.keys(currentLpu).length === 0 ? -1 : currentLpu.ate,
      lpu: Object.keys(currentLpu).length === 0 ? -1 : currentLpu.lpu,
      atePodr: Object.keys(currentDepartment).length === 0 || currentDepartment.id < 0 ? -1 : currentDepartment.kdate,
      podr: Object.keys(currentDepartment).length === 0 || currentDepartment.id < 0 ? -1 : currentDepartment.code,
      usl: variant.usl,
      obst: variant.obst,
      cost: 0,
      uslName: variant.uslName,
      obstName: variant.obstName,
      dstart: variant.dstart,
      dstop: variant.dstop,
      grp: variant.grp,
      description: variant.description,
      idUsl: variant.idUsl,
      idObst: variant.idObst,
      idType: variant.idType,
      status: 'new',
      choice: false,
      currentCost: 0,
    }
    dispatch(addTarifToDataset(newTarif))
  }

  const handlerChangeFilter = ({ target }) => {
    setTextVariant(target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e)} value={textVariant} placeholder="Часть кода услуги, обстоятельства или названия" />
      </div>
      <div className={styles.listVariant}>
        <ul>
          {variants.map((variant) => {
            const alreadySelected = tarif.findIndex((item) => item.idUsl === variant.idUsl && item.idObst === variant.idObst)
            return (
              alreadySelected === -1 &&
              (!textVariant ||
                (textVariant &&
                  (variant.usl.toLowerCase().includes(textVariant.toLowerCase()) ||
                    variant.obst.toLowerCase().includes(textVariant.toLowerCase()) ||
                    variant.uslName.toLowerCase().includes(textVariant.toLowerCase()) ||
                    variant.obstName.toLowerCase().includes(textVariant.toLowerCase())))) && <Variant key={variant.idTarif} variant={variant} onclick={() => handlerAddVariant(variant)} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
