import { useSelector } from 'react-redux'
import styles from './listKsg.module.css'

export const ListKsg = () => {
  const dataset = useSelector((state) => state.datasetModel.dataset)
  const dataset2 = useSelector((state) => state.datasetModel.dataset2)
  // console.log(dataset, dataset2)

  return <div className={styles.container}>Показать по КСГ</div>
}
