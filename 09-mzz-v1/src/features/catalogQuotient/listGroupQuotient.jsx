import { useDispatch, useSelector } from 'react-redux'
import styles from './listGroupQuotient.module.css'
import { GroupQuotient } from './groupQuotient'
import { setCurrentGroupQuotient } from './listQuotientSlice'

export const ListGroupQuotient = () => {
  const groupQuotient = useSelector((state) => state.listQuotient.groupQuotient)
    .slice()
    .sort((a, b) => a.grp - b.grp)
  const dispatch = useDispatch()

  const handlerClickGroupQuotient = (grp) => {
    dispatch(setCurrentGroupQuotient(grp))
    // dispatch(toggleExtraPanel(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.groups}>
        {groupQuotient.map((group) => (
          <GroupQuotient key={group.grp} grp={group} onclick={() => handlerClickGroupQuotient(group.grp)} />
        ))}
      </div>
    </div>
  )
}
