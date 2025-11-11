import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './listModels.module.css'
import { loaderData } from '../../utils/loaderData'
import { setListModels, addModel, closeMenuModel } from './listModelsSlice'
import { Model } from './model'
import { Icon } from '../../UI/icons/icon'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { closeMessage, showMessage, toggleExtraPanel, toggleLoader } from '../../optionsSlice'
import { URL, SETTINGS, SUCCESS_MESSAGE, WARNING_MESSAGE } from '../../const/const'
import { RightPanel } from '../../components/rightPanel/rightPanel'
import { FormNewModel } from './formNewModel'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { FilterListModels } from './filterListModels'

export const ListModels = () => {
  const [showMenuModels, setShowMenuModels] = useState(false)
  const [dateNewModel, setDateNewModel] = useState(null)
  const [numberNewModel, setNumberNewModel] = useState(null)
  const [descriptionNewModel, setDescriptionNewModel] = useState('')
  const dispatch = useDispatch()
  const models = useSelector((state) => state.listModels.models)
  const extraPanel = useSelector((state) => state.options.extraPanel)
  const filterPanel = useSelector((state) => state.options.filterPanel)
  const currentYear = useSelector((state) => state.lists.currentYear.code)
  const comparedModels = models.filter((model) => (model.choice ? model : null))

  useEffect(() => {
    const data = { year: currentYear }
    //dispatch(toggleLoader(true))
    loaderData(URL.URL_GET_LIST_MODELS, data)
      .then((result) => {
        if (result.error) {
          return
        }
        dispatch(setListModels(result.dataset))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        //dispatch(toggleLoader(false))
        dispatch(showMessage({ type: 'success', text: 'Модели успешно загружены' }))
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      })
  }, [currentYear])

  const handlerMenuModels = () => {
    setShowMenuModels((prev) => !prev)
  }

  const handlerSaveNewModel = () => {
    const data = { description: descriptionNewModel, date: dateNewModel, year: currentYear }
    loaderData(URL.URL_ADD_MODEL, data)
      .then((result) => {
        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE(result.msg)))
          return
        }
        dispatch(showMessage(SUCCESS_MESSAGE(result.msg)))
        dispatch(addModel(result.model))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        dispatch(toggleExtraPanel(false))
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      })
  }

  const handlerCreateNewModel = (model = null) => {
    const currentDateTime = Date.now()
    const date = new Date(currentDateTime)
    const stringDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    dispatch(toggleExtraPanel(true))
    !model ? setShowMenuModels(false) : dispatch(closeMenuModel(model.uuid))
    setDateNewModel(stringDate)
    if (models.length) {
      const lastModel = models.reduce((acc, curr) => (acc.b > curr.b ? acc : curr))
      setNumberNewModel(lastModel.num + 1)
    } else {
      setNumberNewModel(1)
    }
    !model ? setDescriptionNewModel('') : setDescriptionNewModel(`Копия модели №${model.num} от ${model.createdString}`)
  }

  return (
    <div className={styles.container}>
      <div>
        <FilterPanel>{filterPanel && <FilterListModels />}</FilterPanel>
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <span>Список моделей</span>
          <div className={styles.menuModels}>
            <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerMenuModels} />
            {showMenuModels && (
              <DropMenu type="models-menu">
                <div onClick={() => handlerCreateNewModel()}>Создать новую</div>
                {comparedModels.length > 1 ? <div>Сравнить модели</div> : null}
              </DropMenu>
            )}
          </div>
        </div>
        <div className={styles.headerListModel}>
          <div className={styles.headerChoiceModel}>
            <div className={styles.headerChoiceModelCorrect}>&nbsp;</div>
          </div>
          <div className={styles.headerDateModel}>Дата модели</div>
          <div className={styles.headerNumModel}>Номер модели</div>
          <div className={styles.headerEditModel}>Открыта</div>
          <div className={styles.headerReleaseModel}>Опубликована</div>
          <div className={styles.headerDescriptionModel}>Описание модели</div>
          <div className={styles.headerMenuModel}>
            <div className={styles.headerMenuModelCorrect}>&nbsp;</div>
          </div>
        </div>
        <ul>
          {models.map((model) => (
            <li className={styles.model} key={model.uuid}>
              <Model model={model} copyModel={() => handlerCreateNewModel(model)} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        {extraPanel && (
          <RightPanel header="Новая модель">
            <FormNewModel
              date={dateNewModel}
              num={numberNewModel}
              description={descriptionNewModel}
              saveNewModel={handlerSaveNewModel}
              onChangeDescription={({ target }) => setDescriptionNewModel(target.value)}
            />
          </RightPanel>
        )}
      </div>
    </div>
  )
}
