import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Icon } from '../../../../UI/icons/icon'
import styles from './ksg.module.css'
import { choiceKsg, setCurrentCount } from './datasetHospSlice'
import { InputUI } from '../../../../UI/input/input'
// import { DropMenu } from '../../../../UI/dropMenu/dropMenu'

export const Ksg = memo(({ ksg }) => {
  const [countAdult, setCountAdult] = useState(Number(ksg.currentAdult))
  const [countChild, setCountChild] = useState(Number(ksg.currentChild))
  const [updateKsgInStore, setUpdateKsgInStore] = useState(false)
  const preSaveCountAdult = ksg.adult
  const preSaveCountChild = ksg.child
  const extraPanel = useSelector((state) => state.options.extraPanel)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setCountAdult(Number(ksg.currentAdult))
    setCountChild(Number(ksg.currentChild))
  }, [Number(ksg.currentAdult), Number(ksg.currentChild)])

  useEffect(() => {
    if (updateKsgInStore) {
      dispatch(setCurrentCount({ ksg: ksg.id, adult: countAdult, child: countChild }))
      setUpdateKsgInStore(false)
    }
  }, [updateKsgInStore])

  //   const handlerMenuKsg = (id) => {
  //     dispatch(openMenuKsg(id))
  //   }

  //   const handlerRemoveKsg = (id) => {
  //     console.log(id)
  //   }

  //   const handlerMoveKsg = (id) => {
  //     console.log(id)
  //   }

  const handlerChoiceKsg = (id) => {
    dispatch(choiceKsg(id))
  }

  const handlerChangeCountKsg = ({ target }, setFunc, old) => {
    const count = +target.value
    if (typeof count === 'number' && !isNaN(count)) {
      setFunc(target.value)
      setUpdateKsgInStore(true)
    }
  }

  return (
    <div className={styles.container}>
      {!extraPanel && (
        <div className={styles.choiceKsg}>
          <Icon
            type={ksg.choice ? 'fa-check-square-o' : 'fa-square-o'}
            size="fa-1x"
            title={ksg.choice ? 'В подборе' : ''}
            icon={ksg.choice ? 'icon-ksg-choice-yes' : 'icon-ksg-choice-no'}
            onclick={() => handlerChoiceKsg(ksg.id)}
          />
        </div>
      )}
      <div className={`${styles.fed} ${ksg.status === 'remove' ? styles.remove : ''} ${ksg.status === 'new' ? styles.newKsg : ''}`}>{ksg.fed}</div>
      <div className={styles.description}>
        <div>{ksg.name}</div>
        <div>
          {ksg.grp} ({ksg.description})
        </div>
      </div>
      <div className={styles.info}>
        {ksg.status === 'remove' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Помечен на удаление" icon="icon-marked-remove" />}
        {ksg.status === 'update' && (
          <Icon
            type="fa-exclamation-triangle"
            size="fa-1x"
            title={`Произошли изменения:\nВзрослые ${preSaveCountAdult} -> ${countAdult}\nДети ${preSaveCountChild} -> ${countChild}`}
            icon="icon-marked-remove"
          />
        )}
        {ksg.status === 'new' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Новый элемент" icon="icon-marked-new" />}
      </div>
      <div className={styles.lvl}>{ksg.lvl}</div>
      <div className={styles.adult}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeCountKsg(e, setCountAdult, preSaveCountAdult)} value={countAdult} placeholder="Взрослые" />
      </div>
      <div className={styles.child}>
        <InputUI variant="input-quotient" onchange={(e) => handlerChangeCountKsg(e, setCountChild, preSaveCountChild)} value={countChild} placeholder="Дети" />
      </div>
      {/* <div className={styles.total}></div> */}
      <div className={styles.warning}></div>
      {/* {!extraPanel && (
        <div className={styles.menuKsg}>
          <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-ksg-menu" onclick={() => handlerMenuKsg(ksg.id)} />
          {ksg.showMenu && (
            <DropMenu type="ksg-menu">
              <div onClick={() => handlerRemoveKsg(ksg.id)}>Удалить из списка</div>
              <div onClick={() => handlerMoveKsg(ksg.id)}>Перенести</div>
              <div>Пункт 3</div>
              <div>Пункт 4</div>
            </DropMenu>
          )}
        </div>
      )} */}
    </div>
  )
})
