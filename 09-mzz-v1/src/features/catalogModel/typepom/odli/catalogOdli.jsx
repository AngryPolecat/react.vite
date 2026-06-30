import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './catalogOdli.module.css'
import { InputUI } from '../../../../UI/input/input'
import { closeFilterPanel, closeMessage, showMessage, toggleExtraPanel } from '../../../../optionsSlice'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../../../const/const'
import { loaderData } from '../../../../utils/loaderData'
import { applyUpdateDataset, markingForDeletion, setDatasetOdli, setFilterDataset } from './datasetOdliSlice'
import { ListOdli } from './listOdli'
import { DropMenu } from '../../../../UI/dropMenu/dropMenu'
import { Icon } from '../../../../UI/icons/icon'

export const CatalogOdli = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [textOdli, setTextOdli] = useState('')
  const status = useSelector((state) => state.options.statusLoadingLists)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.code)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const availableUpdating = useSelector((state) => state.datasetOdli.dataset).filter((odli) => odli.status === 'update' || odli.status === 'new' || (odli.status === 'remove' && odli))
  const availableChoice = useSelector((state) => state.datasetOdli.dataset).filter((odli) => odli.choice && odli)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    !status && navigate('/')
    const data = { model: currentModel, lpu: currentLpu, department: currentDepartment, typepom: currentTypepom }
    loaderData(URL.URL_GET_DATA_MODEL, data)
      .then((result) => {
        console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(setDatasetOdli({ dataset: result.dataset }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }, [currentDepartment, currentTypepom, currentLpu])

  const handlerChangeFilter = ({ target }) => {
    setTextOdli(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      dispatch(setFilterDataset(target.value))
    }
  }

  const handlerMarkingForDeletion = () => {
    setShowMenu(false)
    dispatch(markingForDeletion())
  }

  const handlerStatusMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const updateDatasetDb = () => {}

  const handlerSaveUpdate = () => {
    setShowMenu(false)
    // update внешнего хранилища
    updateDatasetDb()
    dispatch(applyUpdateDataset())
  }

  const handlerAddOdli = () => {
    setShowMenu(false)
    dispatch(toggleExtraPanel(true))
  }

  return (
    <div className={styles.container}>
      <div className={styles.activeBar}>
        <div className={styles.filterBar}>
          <div className={styles.filter}>
            <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e)} value={textOdli} placeholder="Часть кода услуги, обстоятельства или названия" />
          </div>
        </div>
        <div className={styles.menu}>
          <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenu} />
          {showMenu && (
            <DropMenu type="models-menu">
              <div onClick={() => handlerAddOdli()}>Добавить</div>
              {availableChoice.length > 0 ? <div onClick={() => handlerMarkingForDeletion()}>Пометить на удаление</div> : null}
              {availableUpdating.length > 0 ? <div onClick={() => handlerSaveUpdate()}>Сохранить все изменения</div> : null}
              {/* 
              {comparedKsg.length ? <div onClick={() => handlerCancelVariant()}>Отменить выделение</div> : null}
              {markedForDeletion.length ? <div onClick={() => handlerCancelRemoveVariant()}>Снять пометку на удаление</div> : null}
              <div onClick={() => handlerCleanAll()}>Очистить весь список</div> */}
            </DropMenu>
          )}
        </div>
      </div>
      <ListOdli />
    </div>
  )
}
