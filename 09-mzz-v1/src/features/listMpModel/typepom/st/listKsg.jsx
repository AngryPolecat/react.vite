import { useSelector } from 'react-redux'
import styles from './listKsg.module.css'
import { Ksg } from './ksg'

export const ListKsg = () => {
  const dataset = useSelector((state) => state.datasetModel.dataset)
  const currentGroup = useSelector((state) => state.datasetModel.currentGroup)

  return (
    <div className={styles.container}>
      <ul>
        {dataset.map(
          (ksg) =>
            (!currentGroup || currentGroup === ksg.kd_gr_ksg) && (
              <li key={ksg.id} className={styles.data}>
                <Ksg ksg={ksg} />
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
