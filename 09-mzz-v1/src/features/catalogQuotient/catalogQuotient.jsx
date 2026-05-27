import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './catalogQuotient.module.css'
import { FilterListQuotient } from './filterListQuotient'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { closeFilterPanel, closeMessage, showMessage, toggleStatusGroupQuotient } from '../../optionsSlice'
import { SETTINGS, TYPEPOM, URL, WARNING_MESSAGE } from '../../const/const'
import { loaderData } from '../../utils/loaderData'
import { setCurrentGroupQuotient, setFilterQuotient, setListQuotient } from './listQuotientSlice'
import { Icon } from '../../UI/icons/icon'
import { InputUI } from '../../UI/input/input'
import { ListQuotient } from './listQuotient'
import { ListGroupQuotient } from './listGroupQuotient'
import { DropMenu } from '../../UI/dropMenu/dropMenu'

export const CatalogQuotient = () => {
  const [showMenuQuotient, setShowMenuQuotient] = useState(false)
  const [textKsg, setTextKsg] = useState('')
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const status = useSelector((state) => state.options.statusLoadingLists)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const statusGroupQuotient = useSelector((state) => state.options.statusGroupQuotient)
  const currentGroupQuotient = useSelector((state) => state.listQuotient.currentGroupQuotient)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const param = useParams()

  const updateListQuotient = (textKsg) => {
    // console.log(currentFilterQuotient)
    // console.log(textKsg)
    // setTextKsg(currentFilterDataset)
    const data = { model: currentModel, typepom: param.typepomId }
    // loaderData(URL.URL_GET_QUOTIENT, data)
    //   .then((result) => {
    //     console.log(result)
    //     if (result.error) {
    //       dispatch(showMessage(WARNING_MESSAGE(result.msg)))
    //       return
    //     }
    //     // dispatch(setDatasetModel({ dataset: result.dataset, dataset2: result.dataset2 }))
    //   })
    //   .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
    //   .finally(() => {
    //     setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
    //     //dispatch(toggleLoader(false))
    //   })
  }

  useEffect(() => {
    !status && navigate('/')
    const data = { model: currentModel, typepom: param.typepomId }
    loaderData(URL.URL_GET_QUOTIENT, data)
      .then((result) => {
        // console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(setListQuotient({ quotient: result.dataset, group: result.dataset2 }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }, [])

  const resetOptions = () => {
    setTextKsg('')
    setShowMenuQuotient(false)
    dispatch(setFilterQuotient(''))
    dispatch(setCurrentGroupQuotient(null))
    dispatch(closeFilterPanel())
  }

  const handlerClickReturnGroupQuotient = () => {
    resetOptions()
    // dispatch(cancelKsg())
  }

  const handlerClickBack = () => {
    resetOptions()
    navigate(-1)
  }

  const handlerChangeStatusGroupQuotient = () => {
    resetOptions()
    dispatch(toggleStatusGroupQuotient())
    // dispatch(setFilterDataset(''))
    // dispatch(cancelKsg())
  }

  const handlerChangeFilter = ({ target }, setTextKsg) => {
    setTextKsg(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      dispatch(setFilterQuotient(target.value))
    }
  }

  const handlerStatusMenuQuotient = () => {
    setShowMenuQuotient((prev) => !prev)
  }

  const handlerResetAllQuotient = () => {}

  const handlerSaveUpdateQuotient = () => {}

  return (
    <div className={styles.container}>
      <div>
        <FilterPanel>{filterPanel && <FilterListQuotient />}</FilterPanel>
      </div>
      <div className={styles.activeBar}>
        <div className={styles.header}>
          <div className={styles.description}>
            <span className={styles.back} onClick={handlerClickBack}>
              Вернуться
            </span>
            <span>|</span>
            <span>Список коэффициентов</span>
          </div>
        </div>
        <div className={styles.filterBar}>
          {!currentGroupQuotient && (
            <div className={styles.toggle}>
              {statusGroupQuotient ? (
                <Icon type="fa-toggle-on" size="fa-2x" title="Показать по КСГ" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupQuotient} />
              ) : (
                <Icon type="fa-toggle-off" size="fa-2x" title="Показать по группам" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupQuotient} />
              )}
              <span className={styles.toggleText}>По группам</span>
            </div>
          )}
          {(currentGroupQuotient || !statusGroupQuotient) && (
            <>
              <div className={styles.filter}>
                <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextKsg)} value={textKsg} placeholder="Часть кода КСГ или названия" />
              </div>
              <div className={styles.menu}>
                <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenuQuotient} />
                {showMenuQuotient && (
                  <DropMenu type="models-menu">
                    {currentGroupQuotient && <div onClick={handlerClickReturnGroupQuotient}>Вернуться к группам</div>}
                    <div onClick={handlerResetAllQuotient}>Обнулить весь список</div>
                    <div onClick={handlerSaveUpdateQuotient}>Применить изменения</div>
                  </DropMenu>
                )}
              </div>
            </>
          )}
        </div>
        {currentGroupQuotient || !statusGroupQuotient ? <ListQuotient /> : <ListGroupQuotient />}
      </div>
    </div>
  )
}
