import { Icon } from '../../UI/icons/icon'
import { InputUI } from '../../UI/input/input'
import { TextAreaUI } from '../../UI/input/text'
import styles from './formNewModel.module.css'

export const FormNewModel = ({ date, num, description, saveNewModel, onChangeDescription }) => {
  return (
    <>
      <div className={styles.field}>
        <div className={styles.label}>Дата создания</div>
        <div>
          <InputUI variant="input-new-model" disabled={true} value={date} />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Номер модели</div>
        <div>
          <InputUI variant="input-new-model" disabled={true} value={num} />
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Основание модели</div>
        <div>
          <TextAreaUI onchange={onChangeDescription}>{description}</TextAreaUI>
        </div>
      </div>
      <Icon type="fa-floppy-o" size="fa-2x" title="Создать новую модель" icon="icon-save-new-model" onclick={saveNewModel} />
    </>
  )
}
