import { useSelector } from 'react-redux'
import styles from './selectedVariant.module.css'
import { useEffect } from 'react'

export const SelectedVariant = () => {
  const currentModel = useSelector((state) => state.listModels.currentModel)
  const currentLpu = useSelector((state) => state.listLpu.currentLpu.mcod)
  const currentDepartment = useSelector((state) => state.listDepartment.currentDepartment)
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)
  const status = useSelector((state) => state.options.statusLoadingLists)

  useEffect(() => {
    !status && navigate('/')
    const data = { model: currentModel, lpu: currentLpu, department: currentDepartment, typepom: currentTypepom }
    console.log(data)
  }, [currentDepartment, currentTypepom])

  return <div className={styles.container}>Список выбранных вариантов</div>
}
