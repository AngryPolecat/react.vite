import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './variantSt.module.css'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../../../const/const'
import { loaderData } from '../../../../utils/loaderData'
import { closeMessage, showMessage } from '../../../../optionsSlice'
import { InputUI } from '../../../../UI/input/input'

export const VariantSt = () => {
  const [variant, setVariant] = useState([])
  const [textKsg, setTextKsg] = useState('')
  // const [updateFilter, setUpdateFilter] = useState(false)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentGroup = useSelector((state) => state.datasetModel.currentGroup)
  const dispatch = useDispatch()

  const updateListVariant = (textKsg) => {
    const data = { model: currentModel, typepom: currentTypepom, grp: currentGroup, ksg: textKsg }
    console.log(data)
    loaderData(URL.URL_GET_VARIANT, data)
      .then((result) => {
        // console.log(result)
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

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextKsg)} value={textKsg} placeholder="Часть кода КСГ или названия" />
      </div>
      <div className={styles.variant}>
        <ul>
          {variant.map((item) => (
            <li className={styles.itemString} key={item.id}>
              <div className={styles.item}>
                <div className={styles.itemFed}>{item.fed}</div>
                <div className={styles.itemName}>{item.name}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
