import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputUI } from '../../UI/input/input'
import styles from './filterListLpu.module.css'
import { DropList } from '../../UI/droplists/droplists'
import { changeCurrentAte } from '../../listsSlice'

export const FilterListLpu = ({ onChange }) => {
  const dispatch = useDispatch()
  const listAte = useSelector((state) => state.lists.ate)
  const currentAte = useSelector((state) => state.lists.currentAte)

  const [textName, setTextName] = useState('')
  const [textMcod, setTextMcod] = useState('')
  const [updateFilter, setUpdateFilter] = useState(false)

  useEffect(() => {
    if (updateFilter) {
      setUpdateFilter(false)
      onChange(textName, textMcod, currentAte.code)
    }
  }, [updateFilter])

  const handlerChangeFilter = ({ target }, setText) => {
    setText(target.value)
    if (target.value.length >= 3 || !target.value.length) {
      setUpdateFilter(true)
    }
  }

  const selectCurrentAte = (item) => {
    dispatch(changeCurrentAte(item))
    setUpdateFilter(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.label}>Наименование</div>
        <div>
          <InputUI variant="input-filter" onchange={(e) => handlerChangeFilter(e, setTextName)} value={textName} />
        </div>
        <div className={styles.label}>Территория</div>
        <DropList list={listAte} current={currentAte} onchange={selectCurrentAte} />
        <div className={styles.label}>МКОД</div>
        <div>
          <InputUI variant="input-filter" onchange={(e) => handlerChangeFilter(e, setTextMcod)} value={textMcod} />
        </div>
      </div>
    </div>
  )
}
