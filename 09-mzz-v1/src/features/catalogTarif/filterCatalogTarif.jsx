import { useDispatch, useSelector } from 'react-redux'
import { DropList } from '../../UI/droplists/droplists'
import styles from './filterCatalogTarif.module.css'
import { setCurrentLpu } from '../catalogLpuModel/listLpuSlice'

export const FilterCatalogTarif = () => {
  const listLpu = useSelector((state) => state.listLpu.lpu)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu)
  const formatedListLpu = listLpu.map((lpu) => ({ code: lpu.id, description: lpu.name }))
  const formatedCurrentLpu = formatedListLpu.filter((lpu) => lpu.code === currentLpu.id)[0]
  const dispatch = useDispatch()

  const changeCurrentLpu = (item) => {
    const selectedLpu = listLpu.filter((lpu) => lpu.id === item.code)[0]
    dispatch(setCurrentLpu(selectedLpu))
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>ЛПУ</div>
        <DropList list={formatedListLpu} current={formatedCurrentLpu} onchange={changeCurrentLpu} />
      </div>
    </div>
  )
}
