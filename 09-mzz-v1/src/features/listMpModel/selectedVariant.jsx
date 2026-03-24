import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './selectedVariant.module.css'
import { useEffect, useState } from 'react'
import { loaderData } from '../../utils/loaderData'
import { SETTINGS, URL, WARNING_MESSAGE, TYPEPOM } from '../../const/const'
import { closeMessage, showMessage, toggleExtraPanel, toggleStatusGroupKsg } from '../../optionsSlice'
import { applyUpdateVariant, cancelKsg, cancelRemoveFromDataset, clearAllVariant, removeFromDataset, setCurrentGroup, setDatasetModel, setFilterDataset } from './datasetModelSlice'
import { ListKsg } from './typepom/st/listKsg'
import { Icon } from '../../UI/icons/icon'
import { ListGroup } from './typepom/st/listGroup'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { InputUI } from '../../UI/input/input'

export const SelectedVariant = () => {
  const currentFilterDataset = useSelector((state) => state.datasetModel.filterDataset)
  const [textKsg, setTextKsg] = useState(currentFilterDataset)
  const [showMenu, setShowMenu] = useState(false)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.code)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const status = useSelector((state) => state.options.statusLoadingLists)
  const statusGroupKsg = useSelector((state) => state.options.statusGroupKsg)
  const currentGroup = useSelector((state) => state.datasetModel.currentGroup)
  const dataset = useSelector((state) => state.datasetModel.dataset)
  const comparedKsg = dataset.filter((ksg) => (ksg.choice ? ksg : null))
  const markedForDeletion = dataset.filter((ksg) => (ksg.status === 'remove' ? ksg : null))
  const markedForSaving = dataset.filter((ksg) => (ksg.status === 'remove' || ksg.status === 'update' ? ksg : null))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateListSelected = (textKsg) => {
    setTextKsg(currentFilterDataset)
    const data = { model: currentModel, lpu: currentLpu, department: currentDepartment, typepom: currentTypepom, ksg: currentFilterDataset }
    loaderData(URL.URL_GET_DATA_MODEL, data)
      .then((result) => {
        // console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(setDatasetModel({ dataset: result.dataset, dataset2: result.dataset2 }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }

  useEffect(() => {
    !status && navigate('/')
    updateListSelected(textKsg)
  }, [currentDepartment, currentTypepom, currentLpu, currentFilterDataset])

  const handlerStatusMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const handlerAddVariant = () => {
    dispatch(toggleExtraPanel(true))
    setShowMenu(false)
  }

  const handlerClickReturnGroup = () => {
    dispatch(setFilterDataset(''))
    dispatch(setCurrentGroup(null))
    setShowMenu(false)
    dispatch(cancelKsg())
  }

  const handlerChangeFilter = ({ target }, setTextKsg) => {
    setTextKsg(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      dispatch(setFilterDataset(target.value))
    }
  }

  const handlerChangeStatusGroupKsg = () => {
    dispatch(setFilterDataset(''))
    dispatch(toggleStatusGroupKsg())
    dispatch(cancelKsg())
  }

  const handlerCleanVariant = () => {
    dispatch(clearAllVariant(currentGroup))
    setShowMenu(false)
  }

  const handlerCancelVariant = () => {
    dispatch(cancelKsg())
    setShowMenu(false)
  }

  const handlerRemoveVariant = () => {
    dispatch(removeFromDataset(currentGroup))
    setShowMenu(false)
  }

  const handlerCancelRemoveVariant = () => {
    dispatch(cancelRemoveFromDataset())
    setShowMenu(false)
  }

  const handlerSaveVariant = () => {
    // записать изменения в базу
    dispatch(applyUpdateVariant())
    setShowMenu(false)
  }

  switch (currentTypepom) {
    case TYPEPOM.ST:
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
                  <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextKsg)} value={textKsg} placeholder="Часть кода КСГ или названия" />
                </div>
              )}
            </div>
            <div className={styles.menu}>
              <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenu} />
              {showMenu && (
                <DropMenu type="models-menu">
                  {currentGroup && <div onClick={handlerClickReturnGroup}>Вернуться к группам</div>}
                  <div onClick={() => handlerAddVariant()}>Добавить</div>
                  {markedForSaving.length ? <div onClick={() => handlerSaveVariant()}>Применить изменения</div> : null}
                  {comparedKsg.length ? <div onClick={() => handlerCancelVariant()}>Отменить выделение</div> : null}
                  {markedForDeletion.length ? <div onClick={() => handlerCancelRemoveVariant()}>Снять пометку на удаление</div> : null}
                  {comparedKsg.length ? <div>Перенести выбранные</div> : null}
                  {comparedKsg.length ? <div onClick={() => handlerRemoveVariant()}>Пометить на удаление</div> : null}
                  <div onClick={() => handlerCleanVariant()}>Очистить весь список</div>
                </DropMenu>
              )}
            </div>
          </div>
          {/* {statusGroupKsg ? <ListGroup /> : <ListKsg />} */}
          {currentGroup || !statusGroupKsg ? <ListKsg /> : <ListGroup />}
        </div>
      )
    case TYPEPOM.AMB:
      return <div className={styles.container}>Амбулаторная помощь</div>
    case TYPEPOM.DSP:
      return <div className={styles.container}>Диспансеризация</div>
    case TYPEPOM.INO:
      return <div className={styles.container}>Инообластные</div>
    case TYPEPOM.ODLI:
      return <div className={styles.container}>ОДЛИ</div>
    case TYPEPOM.SMP:
      return <div className={styles.container}>Скорая помощь</div>
    case TYPEPOM.SZT:
      return <div className={styles.container}>Дневной стационар</div>
  }
}
