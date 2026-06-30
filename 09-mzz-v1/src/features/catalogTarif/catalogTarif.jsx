import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './catalogTarif.module.css'
import { closeFilterPanel, closeMessage, showMessage, toggleExtraPanel } from '../../optionsSlice'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { loaderData } from '../../utils/loaderData'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../const/const'
import { ListDepartment } from './listDepartment'
import { ListTarif } from './listTarif'
import { applyUpdateTarif, markingForDeletion, setCurrentDepartment, setFilterTarif, setListTarif } from './listTarifSlice'
import { InputUI } from '../../UI/input/input'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { Icon } from '../../UI/icons/icon'
import { RightPanel } from '../../components/rightPanel/rightPanel'
import { FilterCatalogTarif } from './filterCatalogTarif'
import { ListVariants } from './listVariants'

export const CatalogTarif = () => {
  const [showMenuTarif, setShowMenuTarif] = useState(false)
  const [textTarif, setTextTarif] = useState('')
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const status = useSelector((state) => state.options.statusLoadingLists)
  const extraPanel = useSelector((state) => state.options.extraPanel)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const nameLpu = useSelector((state) => state.listLpu.currentLpu.name)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment.code)
  const availableChoice = useSelector((state) => state.listTarif.tarif).filter((tarif) => tarif.choice && tarif)
  const availableUpdating = useSelector((state) => state.listTarif.tarif).filter((tarif) => (tarif.status === 'update' || tarif.status === 'new' || tarif.status === 'remove') && tarif)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    !status && navigate('/')
    const data = { model: currentModel, lpu: currentLpu, typepom: param.typepomId }
    // console.log(data)

    loaderData(URL.URL_GET_TARIF, data)
      .then((result) => {
        // console.log(result)
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(setListTarif({ tarif: result.dataset, variants: result.dataset2 }))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        //dispatch(toggleLoader(false))
      })
  }, [currentLpu])

  const handlerClickBack = () => {
    dispatch(closeFilterPanel())
    dispatch(setCurrentDepartment({}))
    dispatch(toggleExtraPanel(false))
    navigate(-1)
  }

  const handlerChangeFilter = ({ target }, setTextKsg) => {
    setTextTarif(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      dispatch(setFilterTarif(target.value))
    }
  }

  const handlerStatusMenuTarif = () => {
    setShowMenuTarif((prev) => !prev)
  }

  const handlerAddTarif = () => {
    setShowMenuTarif(false)
    dispatch(toggleExtraPanel(true))
  }

  const handlerMarkingForDeletion = () => {
    setShowMenuTarif(false)
    dispatch(markingForDeletion())
  }

  const updateTarifDb = () => {
    // записываем в базу изменения
  }

  const handlerSaveUpdateTarif = () => {
    setShowMenuTarif(false)
    updateTarifDb()
    dispatch(applyUpdateTarif())
  }

  return (
    <div className={styles.container}>
      <div>
        <FilterPanel>{filterPanel && currentLpu && <FilterCatalogTarif />}</FilterPanel>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.description}>
            <span className={styles.back} onClick={handlerClickBack}>
              Вернуться
            </span>
            <span>|</span>
            <span>{currentLpu ? `Тарифы ОДЛИ ${nameLpu}` : 'Глобальные тарифы ОДЛИ'}</span>
          </div>
        </div>
        <div className={styles.work}>
          {currentLpu && (
            <div className={styles.listDepartment}>
              <ListDepartment />
            </div>
          )}
          <div className={styles.listTarif}>
            <div className={styles.filterBar}>
              <div className={styles.filter}>
                <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextTarif)} value={textTarif} placeholder="Часть кода услуги, обстоятельства или названия" />
              </div>
              <div className={styles.menu}>
                <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenuTarif} />
                {showMenuTarif && (
                  <DropMenu type="models-menu">
                    <div onClick={handlerAddTarif}>Добавить новую услугу</div>
                    {availableChoice.length > 0 ? <div onClick={() => handlerMarkingForDeletion()}>Пометить на удаление</div> : null}
                    {availableUpdating.length > 0 && <div onClick={handlerSaveUpdateTarif}>Сохранить все изменения</div>}
                  </DropMenu>
                )}
              </div>
            </div>
            <ListTarif />
          </div>
          <div className={styles.extraPanel}>{extraPanel && <RightPanel header="Добавить тариф">{<ListVariants />}</RightPanel>}</div>
        </div>
      </div>
    </div>
  )
}
