import { useSelector } from 'react-redux'
import { ListModels } from '../../features/listModels/listModels'
import styles from './models.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const ModelsPage = () => {
  const navigate = useNavigate()
  const status = useSelector((state) => state.options.statusLoadingLists)

  useEffect(() => {
    !status && navigate('/')
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListModels />
      </div>
    </div>
  )
}
