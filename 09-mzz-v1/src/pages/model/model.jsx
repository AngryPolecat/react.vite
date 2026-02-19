import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './model.module.css'
import { ListLpuModel } from '../../features/listLpuModel/listLpuModel'
import { loaderData } from '../../utils/loaderData'
import { URL, WARNING_MESSAGE } from '../../const/const'
import { showMessage } from '../../optionsSlice'
import { setListModels } from '../../features/listModels/listModelsSlice'

export const ModelPage = () => {
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  const status = useSelector((state) => state.options.statusLoadingLists)

  useEffect(() => {
    !status && navigate('/')
    const data = { year: 0, model: param.modelId }
    loaderData(URL.URL_GET_LIST_MODELS, data)
      .then((result) => {
        if (result.error) {
          return
        }
        dispatch(setListModels(result.dataset))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        //
      })
  }, [param.modelId])

  return (
    <div className={styles.container}>
      <ListLpuModel modelId={param.modelId} />
    </div>
  )
}
