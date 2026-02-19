import { useDispatch } from 'react-redux'
import styles from './model.module.css'
import { Icon } from '../../UI/icons/icon'
import { choiceModel, openMenuModel, setCurrentModel } from './listModelsSlice'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { useNavigate } from 'react-router-dom'
import { closeFilterPanel } from '../../optionsSlice'

export const Model = ({ model, copyModel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerChoiceModel = (uuid) => {
    dispatch(choiceModel(uuid))
  }

  const handlerMenuModel = (uuid) => {
    dispatch(openMenuModel(uuid))
  }

  const handlerOpenModel = (uuid) => {
    dispatch(closeFilterPanel())
    dispatch(setCurrentModel(uuid))
    navigate(`/model/${uuid}/lpu`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.choiceModel}>
        <Icon
          type={model.choice ? 'fa-check-square-o' : 'fa-square-o'}
          size="fa-1x"
          title={model.choice ? 'В подборе' : ''}
          icon={model.choice ? 'icon-table-models-choice-yes' : 'icon-table-models-choice-no'}
          onclick={() => handlerChoiceModel(model.uuid)}
        />
      </div>
      <div className={styles.dateModel}>{model.createdString}</div>
      <div className={styles.numModel}>{model.num}</div>
      <div className={styles.editModel}>
        {model.editable ? (
          <Icon type="fa-check" size="fa-1x" title="Открыта для редактирования" icon="icon-table-models-yes" />
        ) : (
          <Icon type="fa-times" size="fa-1x" title="Закрыта для редактирования" icon="icon-table-models-no" />
        )}
      </div>
      <div className={styles.releaseModel}>
        {model.released ? (
          <Icon type="fa-check" size="fa-1x" title="Опубликована" icon="icon-table-models-yes" />
        ) : (
          <Icon type="fa-times" size="fa-1x" title="Не опубликована" icon="icon-table-models-no" />
        )}
      </div>
      <div className={styles.descriptionModel}>{model.description}</div>
      <div className={styles.menuModel}>
        <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-table-models-menu" onclick={() => handlerMenuModel(model.uuid)} />
        {model.showMenu && (
          <DropMenu type="model-menu">
            <div onClick={() => handlerOpenModel(model.uuid)}>Открыть</div>
            <div onClick={copyModel}>Сделать копию</div>
            {!model.released && !model.editable ? <div>Открыть на редактирование</div> : null}
            {!model.released && model.editable ? <div>Закрыть на редактирование</div> : null}
            {!model.released && !model.editable ? <div>Опубликовать</div> : null}
            {model.released ? <div>Снять с публикации</div> : null}
            {!model.released && !model.editable ? <div>Удалить</div> : null}
          </DropMenu>
        )}
      </div>
    </div>
  )
}
