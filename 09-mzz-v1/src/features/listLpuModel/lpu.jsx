import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Icon } from '../../UI/icons/icon'
import styles from './lpu.module.css'
import { openMenuLpu, setCurrentLpu } from './listLpuSlice'
import { DropMenu } from '../../UI/dropMenu/dropMenu'
import { closeFilterPanel } from '../../optionsSlice'

export const Lpu = ({ lpu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modelId = useSelector((state) => state.listModels.currentModel.uuid)

  const handlerMenuLpu = (mcod) => {
    dispatch(openMenuLpu(mcod))
  }

  const handlerOpenLpu = (lpu) => {
    const currentLpu = { ...lpu, uuid: uuidv4() }
    dispatch(setCurrentLpu(currentLpu))
    dispatch(closeFilterPanel())
    navigate(`/model/${modelId}/lpu/${currentLpu.uuid}`)
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.codeLpu} ${styles.fields}`}>{lpu.mcod}</div>
      <div className={`${styles.nameLpu} ${styles.fields}`}>{lpu.name}</div>
      <div className={`${styles.innLpu} ${styles.fields}`}>{lpu.inn}</div>
      <div className={`${styles.menuLpu} ${styles.fields}`}>
        <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-table-lpu-menu" onclick={() => handlerMenuLpu(lpu.mcod)} />
        {lpu.showMenu && (
          <DropMenu type="lpu-menu">
            <div onClick={() => handlerOpenLpu(lpu)}>Открыть</div>
            <div>Пункт 2</div>
            <div>Пункт 3</div>
          </DropMenu>
        )}
      </div>
    </div>
  )
}
