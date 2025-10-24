import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ListModels } from '../../features/listModels/listModels'
import styles from './home.module.css'
import { FilterPanel } from '../../components/filterPanel/filterPanel'

export const HomePage = () => {
  // const currentToken = useSelector((state) => state.currentUser.token)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   !currentToken && navigate('/login')
  // }, [])

  return (
    <div className={styles.container}>
      <FilterPanel />
      <div className={styles.content}>
        <ListModels />
      </div>
    </div>
  )
}
