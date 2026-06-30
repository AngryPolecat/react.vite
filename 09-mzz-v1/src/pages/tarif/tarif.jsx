import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './tarif.module.css'
import { CatalogTarif } from '../../features/catalogTarif/catalogTarif'

export const TarifPage = () => {
  const status = useSelector((state) => state.options.statusLoadingLists)
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    !status && navigate('/')
  }, [])

  return (
    <div className={styles.container}>
      <CatalogTarif />
    </div>
  )
}
