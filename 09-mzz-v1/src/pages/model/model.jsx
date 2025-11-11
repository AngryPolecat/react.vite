import { useParams } from 'react-router-dom'
import styles from './model.module.css'

export const ModelPage = () => {
  const param = useParams()

  return <div className={styles.container}>Страница модели {param.id}</div>
}
