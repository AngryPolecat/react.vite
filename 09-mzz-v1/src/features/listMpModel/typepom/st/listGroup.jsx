import { useDispatch, useSelector } from 'react-redux'
import styles from './listGroup.module.css'
import { Group } from './group'
import { setCurrentGroup } from '../../datasetModelSlice'
import { toggleExtraPanel } from '../../../../optionsSlice'

export const ListGroup = () => {
  const dispatch = useDispatch()
  const dataset2 = useSelector((state) => state.datasetModel.dataset2)
    .slice()
    .sort((a, b) => a.kd_gr_ksg - b.kd_gr_ksg)

  const handlerClickGroup = (codeGrp) => {
    dispatch(setCurrentGroup(codeGrp))
    // dispatch(toggleExtraPanel(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.groups}>
        {dataset2.map((grp) => (
          <Group key={grp.kd_gr_ksg} grp={grp} onclick={() => handlerClickGroup(grp.kd_gr_ksg)} />
        ))}
      </div>
    </div>
  )
}
