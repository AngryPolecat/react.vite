import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './lpu.module.css'
import { useNavigate } from 'react-router-dom'
import { CatalogModel } from '../../features/catalogModel/catalogModel'

export const LpuPage = () => {
  const status = useSelector((state) => state.options.statusLoadingLists)
  const navigate = useNavigate()

  useEffect(() => {
    !status && navigate('/')
    // const data = { year: 0, model: param.modelId }
    // loaderData(URL.URL_GET_LIST_MODELS, data)
    //   .then((result) => {
    //     if (result.error) {
    //       return
    //     }
    //     dispatch(setListModels(result.dataset))
    //   })
    //   .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
    //   .finally(() => {
    //     //
    //   })
  }, [])

  return (
    <div className={styles.container}>
      <CatalogModel />
    </div>
  )
}
