import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './selectedVariant.module.css'
import { useEffect, useState } from 'react'
import { loaderData } from '../../utils/loaderData'
import { SETTINGS, URL, WARNING_MESSAGE, TYPEPOM } from '../../const/const'
import { closeMessage, showMessage, toggleExtraPanel, toggleStatusGroupKsg } from '../../optionsSlice'
import { setCurrentGroup, setDatasetModel } from './datasetModelSlice'
import { ListKsg } from './typepom/st/listKsg'
import { Icon } from '../../UI/icons/icon'
import { ListGroup } from './typepom/st/listGroup'
import { DropMenu } from '../../UI/dropMenu/dropMenu'

export const SelectedVariant = () => {
  const [showMenu, setShowMenu] = useState(false)
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.code)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const status = useSelector((state) => state.options.statusLoadingLists)
  const statusGroupKsg = useSelector((state) => state.options.statusGroupKsg)
  const currentGroup = useSelector((state) => state.datasetModel.currentGroup)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
        dispatch(setDatasetModel({ dataset: result.dataset, dataset2: result.dataset2 }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }, [currentDepartment, currentTypepom, currentLpu])

  const handlerStatusMenu = () => {
    setShowMenu((prev) => !prev)
  }

  const handlerAddVariant = () => {
    dispatch(toggleExtraPanel(true))
    setShowMenu(false)
  }

  const handlerClickReturnGroup = () => {
    dispatch(setCurrentGroup(null))
    setShowMenu(false)
  }

  switch (currentTypepom) {
    case TYPEPOM.ST:
      return (
        <div className={styles.container}>
          <div className={styles.activeBar}>
            <div>
              {!currentGroup && (
                <div className={styles.toggle}>
                  {statusGroupKsg ? (
                    <Icon type="fa-toggle-on" size="fa-2x" title="Показать по КСГ" icon="icon-toggle-ksg" onclick={() => dispatch(toggleStatusGroupKsg())} />
                  ) : (
                    <Icon type="fa-toggle-off" size="fa-2x" title="Показать по группам" icon="icon-toggle-ksg" onclick={() => dispatch(toggleStatusGroupKsg())} />
                  )}
                  <span className={styles.toggleText}>По группам</span>
                </div>
              )}
            </div>
            <div className={styles.menu}>
              <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenu} />
              {showMenu && (
                <DropMenu type="models-menu">
                  {currentGroup && <div onClick={handlerClickReturnGroup}>Вернуться к группам</div>}
                  <div onClick={() => handlerAddVariant()}>Добавить</div>
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
