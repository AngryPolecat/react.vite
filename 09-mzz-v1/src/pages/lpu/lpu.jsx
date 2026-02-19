import { useParams } from 'react-router-dom'
import styles from './lpu.module.css'

export const LpuPage = () => {
  const params = useParams()
  console.log(params)

  return (
    <div className={styles.container}>
      Страница Модели: {params.modelId} ЛПУ {params.mcod}{' '}
    </div>
  )
}
