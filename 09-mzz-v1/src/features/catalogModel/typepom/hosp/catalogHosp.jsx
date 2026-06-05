import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './catalogHosp.module.css'
import { Icon } from '../../../../UI/icons/icon'
import { InputUI } from '../../../../UI/input/input'
import { closeFilterPanel, closeMessage, showMessage, toggleStatusGroupKsg } from '../../../../optionsSlice'
import { applyUpdateDataset, setCurrentGroup, setDatasetHosp, setFilterDataset } from './datasetHospSlice'
import { ListKsg } from './listKsg'
import { ListGroup } from './listGroup'
import { useNavigate } from 'react-router-dom'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../../../const/const'
import { loaderData } from '../../../../utils/loaderData'
import { DropMenu } from '../../../../UI/dropMenu/dropMenu'

export const CatalogHosp = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [textKsg, setTextKsg] = useState('')
  const status = useSelector((state) => state.options.statusLoadingLists)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.code)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const currentGroup = useSelector((state) => state.datasetHosp.currentGroup)
  const statusGroupKsg = useSelector((state) => state.options.statusGroupKsg)
  const availableUpdating = useSelector((state) => state.datasetHosp.dataset).filter((ksg) => (ksg.status === 'update' ? ksg : null))
  const availableChoice = useSelector((state) => state.datasetHosp.dataset).filter((ksg) => (ksg.choice ? ksg : null))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    !status && navigate('/')
    const data = { model: currentModel, lpu: currentLpu, department: currentDepartment, typepom: currentTypepom }
    loaderData(URL.URL_GET_DATA_MODEL, data)
      .then((result) => {
        // console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(setDatasetHosp({ dataset: result.dataset, groups: result.dataset2 }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }, [currentDepartment, currentTypepom, currentLpu])

  const resetOptions = () => {
    setTextKsg('')
    setShowMenu(false)
    dispatch(setFilterDataset(''))
    dispatch(setCurrentGroup(null))
    dispatch(closeFilterPanel())
  }

  const handlerClickReturnGroup = () => {
    resetOptions()
  }

  const handlerChangeStatusGroupKsg = () => {
    resetOptions()
    dispatch(toggleStatusGroupKsg())
  }

  const handlerChangeFilter = ({ target }) => {
    setTextKsg(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      dispatch(setFilterDataset(target.value))
    }
  }

  const handlerStatusMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const updateDatasetDb = () => {}

  const handlerSaveUpdate = () => {
    setShowMenu(false)
    dispatch(applyUpdateDataset())
    // update внешнего хранилища
    updateDatasetDb()
  }

  const handlerAddKsg = () => {
    setShowMenu(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.activeBar}>
        <div className={styles.filterBar}>
          {!currentGroup && (
            <div className={styles.toggle}>
              {statusGroupKsg ? (
                <Icon type="fa-toggle-on" size="fa-2x" title="Показать по КСГ" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupKsg} />
              ) : (
                <Icon type="fa-toggle-off" size="fa-2x" title="Показать по группам" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupKsg} />
              )}
              <span className={styles.toggleText}>По группам</span>
            </div>
          )}
          {(currentGroup || !statusGroupKsg) && (
            <div className={styles.filter}>
              <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e)} value={textKsg} placeholder="Часть кода КСГ или названия" />
            </div>
          )}
        </div>
        <div className={styles.menu}>
          <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenu} />
          {showMenu && (
            <DropMenu type="models-menu">
              {currentGroup && <div onClick={handlerClickReturnGroup}>Вернуться к группам</div>}
              <div onClick={() => handlerAddKsg()}>Добавить</div>
              {availableUpdating.length > 0 ? <div onClick={() => handlerSaveUpdate()}>Сохранить все изменения</div> : null}
              {/* {availableChoice.length > 0 ? <div onClick={() => handlerMarkRemove()}>Пометить на удаление</div> : null} */}
              {/* 
              <div onClick={() => handlerAddVariant()}>Добавить</div>
              {comparedKsg.length ? <div onClick={() => handlerCancelVariant()}>Отменить выделение</div> : null}
              {markedForDeletion.length ? <div onClick={() => handlerCancelRemoveVariant()}>Снять пометку на удаление</div> : null}
              {comparedKsg.length ? <div>Перенести выбранные</div> : null}
              {comparedKsg.length ? <div onClick={() => handlerRemoveVariant()}>Пометить на удаление</div> : null}
              <div onClick={() => handlerCleanAll()}>Очистить весь список</div> */}
            </DropMenu>
          )}
        </div>
      </div>
      {currentGroup || !statusGroupKsg ? <ListKsg /> : <ListGroup />}
    </div>
  )
}
