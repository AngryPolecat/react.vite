import { useDispatch, useSelector } from 'react-redux'
import styles from './listMp.module.css'
import { changeCurrentTypepom } from '../../listsSlice'
import { Typepom } from './typepom'
import { toggleExtraPanel } from '../../optionsSlice'
import { setFilterDataset } from './datasetModelSlice'

export const ListMp = () => {
  const listMp = useSelector((state) => state.lists.typepom)
  const dispatch = useDispatch()

  const handlerClickTypepom = (typepomCode) => {
    dispatch(setFilterDataset(''))
    dispatch(changeCurrentTypepom(typepomCode))
    dispatch(toggleExtraPanel(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>Виды помощи</div>
      <ul className={styles.list}>
        {listMp.map((typepom) => (
          <Typepom key={typepom.code} typepom={typepom} onclick={() => handlerClickTypepom(typepom.code)} />
        ))}
      </ul>
    </div>
  )
}
