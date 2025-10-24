import { useDispatch, useSelector } from 'react-redux'
import styles from './model.module.css'
import { Icon } from '../../UI/icons/icon'
import { choiceModel, openMenuModel } from './listModelsSlice'
import { DropMenu } from '../../UI/dropMenu/dropMenu'

export const Model = ({ model }) => {
  const dispatch = useDispatch()
  // const countChoiceModel = useSelector(state => )

  const handlerChoiceModel = (uuid) => {
    dispatch(choiceModel(uuid))
  }

  const handlerMenuModel = (uuid) => {
    dispatch(openMenuModel(uuid))
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
            <div>Открыть</div>
            <div>Сделать копию</div>
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
