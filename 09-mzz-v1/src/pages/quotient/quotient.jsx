import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './quotient.module.css'
import { CatalogQuotient } from '../../features/catalogQuotient/catalogQuotient'

export const QuotientPage = () => {
  const status = useSelector((state) => state.options.statusLoadingLists)
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    !status && navigate('/')
  }, [])

  return (
    <div className={styles.container}>
      <CatalogQuotient />
    </div>
  )
}
