import { useDispatch, useSelector } from 'react-redux'
import styles from './datasetModel.module.css'
import { SETTINGS, URL, WARNING_MESSAGE, TYPEPOM } from '../../const/const'
import { CatalogHosp } from './typepom/hosp/catalogHosp'
import { CatalogSzt } from './typepom/szt/catalogSzt'

export const DatasetModel = () => {
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)

  switch (currentTypepom) {
    case TYPEPOM.ST:
      return <CatalogHosp />
      break
    case TYPEPOM.SZT:
      return <CatalogSzt />
      break
  }
}
