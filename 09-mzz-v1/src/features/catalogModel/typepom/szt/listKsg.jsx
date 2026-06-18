import { useSelector } from 'react-redux'
import styles from './listKsg.module.css'
import { Ksg } from './ksg'

export const ListKsg = () => {
  const filterDataset = useSelector((state) => state.datasetSzt.filterDataset)
  const dataset = useSelector((state) => state.datasetSzt.dataset)
    .slice()
    .filter((item) => item.fed.toLowerCase().includes(filterDataset.toLowerCase()) || item.name.toLowerCase().includes(filterDataset.toLowerCase()))
    .sort((a, b) => a.grp - b.grp || a.fed.localeCompare(b.fed))
  const currentGroup = useSelector((state) => state.datasetSzt.currentGroup)

  return (
    <div className={styles.container}>
      <ul>
        {dataset.map(
          (ksg) =>
            (!currentGroup || currentGroup === ksg.grp) && (
              <li key={ksg.id} className={styles.data}>
                <Ksg ksg={ksg} />
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
