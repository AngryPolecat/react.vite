import { useDispatch, useSelector } from 'react-redux'
import styles from './listMp.module.css'
import { changeCurrentTypepom } from '../../listsSlice'
import { Typepom } from './typepom'

export const ListMp = () => {
  const listMp = useSelector((state) => state.lists.typepom)
  const dispatch = useDispatch()

  const handlerClickTypepom = (typepomCode) => {
    dispatch(changeCurrentTypepom(typepomCode))
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {listMp.map((typepom) => (
          <Typepom key={typepom.code} typepom={typepom} onclick={() => handlerClickTypepom(typepom.code)} />
        ))}
      </ul>
    </div>
  )
}
