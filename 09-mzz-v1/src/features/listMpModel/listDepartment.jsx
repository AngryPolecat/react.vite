import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './listDepartment.module.css'
import { URL } from '../../const/const'
import { loaderData } from '../../utils/loaderData'
import { Department } from './department'
import { setCurrentDepartment, setListDepartment } from './listDepartmentSlice'
import { setFilterDataset } from './datasetModelSlice'

export const ListDepartment = () => {
  const departments = useSelector((state) => state.listDepartment.departments)
  const currentLpuId = useSelector((state) => state.listLpu.currentLpu.id)
  const currentModel = useSelector((state) => state.listModels.currentModel.uuid)
  const status = useSelector((state) => state.options.statusLoadingLists)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    !status && navigate('/')
    const data = { id: currentLpuId, model: currentModel }
    loaderData(URL.URL_GET_LIST_DEP, data)
      .then((result) => {
        //console.log(result)
        if (result.error) {
          return
        }
        dispatch(setListDepartment(result.dataset))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        //dispatch(toggleLoader(false))
      })
  }, [currentLpuId])

  const handlerClickDepartment = (department) => {
    // dispatch(setFilterDataset(''))
    dispatch(setCurrentDepartment(department))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Подразделения</div>
      <ul>
        {departments.map((department) => (
          <Department key={department.id} department={department} onclick={() => handlerClickDepartment(department)} />
        ))}
      </ul>
    </div>
  )
}
