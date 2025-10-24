import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './listModels.module.css'
import { URL } from '../../const/const'
import { loaderData } from '../../utils/loaderData'
import { setListModels } from './listModelsSlice'
import { Model } from './model'
import { Icon } from '../../UI/icons/icon'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { closeMessage, showMessage, toggleLoader } from '../../optionsSlice'
import { SETTINGS } from '../../const/const'

export const ListModels = () => {
  const [showMenuModels, setShowMenuModels] = useState(false)
  const dispatch = useDispatch()
  const models = useSelector((state) => state.listModels.models)
  const comparedModels = models.filter((model) => (model.choice ? model : null))

  useEffect(() => {
    const data = { year: 2025 }
    //dispatch(toggleLoader(true))
    loaderData(URL.URL_GET_LIST_MODELS, data)
      .then((result) => {
        if (result.error) {
          return
        }
        dispatch(setListModels(result.dataset))
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        //dispatch(toggleLoader(false))
        dispatch(showMessage({ type: 'success', text: 'Модели успешно загружены' }))
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      })
  }, [])

  const handlerMenuModels = () => {
    setShowMenuModels((prev) => !prev)
  }

  const handlerCreateNewModel = () => {
    console.log(1)
    const data = {}
    loaderData(URL.URL_ADD_MODEL, data)
      .then((result) => {
        if (result.error) {
          dispatch(showMessage({ type: 'error', text: result.msg }))
          return
        }
        setShowMenuModels(false)
        dispatch(showMessage({ type: 'success', text: result.msg }))
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Список моделей</span>
        <div className={styles.menuModels}>
          <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerMenuModels} />
          {showMenuModels && (
            <DropMenu type="models-menu">
              <div onClick={handlerCreateNewModel}>Создать новую</div>
              {comparedModels.length > 1 ? <div>Сравнить модели</div> : null}
            </DropMenu>
          )}
        </div>
      </div>
      <div className={styles.headerListModel}>
        <div className={styles.headerChoiceModel}></div>
        <div className={styles.headerDateModel}>Дата модели</div>
        <div className={styles.headerNumModel}>Номер модели</div>
        <div className={styles.headerEditModel}>Открыта</div>
        <div className={styles.headerReleaseModel}>Опубликована</div>
        <div className={styles.headerDescriptionModel}>Описание модели</div>
        <div className={styles.headerMenuModel}></div>
      </div>
      <ul>
        {models.map((model) => (
          <li key={model.uuid}>
            <Model model={model} />
          </li>
        ))}
      </ul>
    </div>
  )
}
