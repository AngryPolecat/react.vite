import { useDispatch, useSelector } from 'react-redux'
import styles from './listGroup.module.css'
import { Group } from './group'
import { setCurrentGroup } from './datasetHospSlice'
// import { toggleExtraPanel } from '../../../../optionsSlice'

export const ListGroup = () => {
  const groupKsg = useSelector((state) => state.datasetHosp.groups)
    .slice()
    .sort((a, b) => a.grp - b.grp)
  const dispatch = useDispatch()

  const handlerClickGroup = (grp) => {
    dispatch(setCurrentGroup(grp))
    // dispatch(toggleExtraPanel(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.groups}>
        {groupKsg.map((group) => (
          <Group key={group.grp} group={group} onclick={() => handlerClickGroup(group.grp)} />
        ))}
      </div>
    </div>
  )
}
