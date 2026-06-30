import { useSelector } from 'react-redux'
import styles from './listOdli.module.css'
import { Odli } from './odli'

export const ListOdli = () => {
  const filterDataset = useSelector((state) => state.datasetOdli.filterDataset)
  const dataset = useSelector((state) => state.datasetOdli.dataset)
    .slice()
    .filter(
      (item) =>
        item.usl.toLowerCase().includes(filterDataset.toLowerCase()) ||
        item.obst.toLowerCase().includes(filterDataset.toLowerCase()) ||
        item.uslName.toLowerCase().includes(filterDataset.toLowerCase()) ||
        item.obstName.toLowerCase().includes(filterDataset.toLowerCase()),
    )
    .sort((a, b) => a.grp - b.grp || a.usl.localeCompare(b.usl))
  console.log(dataset)

  return (
    <div className={styles.container}>
      <ul>
        {dataset.map((odli) => (
          <li key={odli.id} className={styles.data}>
            <Odli odli={odli} />
          </li>
        ))}
      </ul>
    </div>
  )
}
