import { useState } from 'react'
import { InputUI } from '../input/input'
import styles from './droplists.module.css'
import { Icon } from '../icons/icon'

export const DropList = ({ list, current, onchange }) => {
  const [openList, setOpenList] = useState(false)
  const [text, setText] = useState(current.description)
  const [items, setItems] = useState(list)

  const handlerToggleDropList = () => {
    setOpenList((prev) => !prev)
  }

  const handlerChangeFilter = ({ target }) => {
    setText(target.value)
    setItems(list.filter((item) => (item.description.toLowerCase().indexOf(target.value.toLowerCase()) > -1 ? item : null)))
  }

  const handlerСhoiceItemList = (item) => {
    setText(item.description)
    setOpenList(false)
    onchange(item)
  }

  return (
    <div className={styles.container}>
      {text && <Icon type="fa-filter" size="fa-1x" title="Установлен фильтр" icon="icon-has-filter" />}
      <InputUI variant="input-filter" onclick={handlerToggleDropList} onchange={(e) => handlerChangeFilter(e)} value={text} />
      {openList && (
        <div className={styles.droplist}>
          <ul>
            {items.map((item) => (
              <li className={styles.itemList} key={item.code} onClick={() => handlerСhoiceItemList(item)}>
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
