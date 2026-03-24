import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import styles from './variantSt.module.css'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../../../const/const'
import { loaderData } from '../../../../utils/loaderData'
import { closeMessage, showMessage } from '../../../../optionsSlice'
import { InputUI } from '../../../../UI/input/input'
import { addToDataset } from '../../datasetModelSlice'

export const VariantSt = () => {
  const [variant, setVariant] = useState([])
  const [textKsg, setTextKsg] = useState('')
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentGroup = useSelector((state) => state.datasetModel.currentGroup)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment)
  const dataset = useSelector((state) => state.datasetModel.dataset)
  const dispatch = useDispatch()

  const updateListVariant = (textKsg) => {
    const data = { model: currentModel.uuid, typepom: currentTypepom, grp: currentGroup, ksg: textKsg }
    loaderData(URL.URL_GET_VARIANT, data)
      .then((result) => {
        console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        setVariant(result.dataset)
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }

  useEffect(() => {
    updateListVariant(textKsg)
  }, [currentGroup])

  const handlerChangeFilter = ({ target }, setTextKsg) => {
    setTextKsg(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      updateListVariant(target.value)
    }
  }

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
      fed: variant.fed,
      ksg: variant.ksg,
      name: variant.name,
      kd_gr_ksg: variant.kd_gr_ksg,
      grp: variant.grp,
      ksg_dstart: variant.dstart,
      ksg_dstop: variant.dstop,
      model_date: currentModel.created,
      lvl: currentDepartment.lvl || currentLpu.lvl,
      q_ad: 0,
      q_ch: 0,
      q_il: 0,
      st_ad: 0,
      st_ch: 0,
      st_all: 0,
      choice: false,
      showMenu: false,
      status: 'new',
    }
    dispatch(addToDataset(newKsg))
  }

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextKsg)} value={textKsg} placeholder="Часть кода КСГ или названия" />
      </div>
      <div className={styles.variant}>
        <ul>
          {variant.map((item) => {
            const alreadySelected = dataset.findIndex((itemDataset) => itemDataset.fed === item.fed)
            if (alreadySelected === -1) {
              return (
                <li className={styles.itemString} key={item.id}>
                  <div className={styles.item} onClick={() => handlerAddVariant(item)}>
                    <div className={styles.itemFed}>{item.fed}</div>
                    <div className={styles.itemName}>{item.name}</div>
                  </div>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}
