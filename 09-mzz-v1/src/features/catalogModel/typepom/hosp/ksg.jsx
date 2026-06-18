import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { evaluate } from 'mathjs'
import { NumericFormat } from 'react-number-format'
import { Icon } from '../../../../UI/icons/icon'
import styles from './ksg.module.css'
import { choiceKsg, setCurrentCount } from './datasetHospSlice'
import { InputUI } from '../../../../UI/input/input'
// import { DropMenu } from '../../../../UI/dropMenu/dropMenu'

export const Ksg = memo(({ ksg }) => {
  const userData = {
    koz: Number(ksg.koz),
    upr: Number(ksg.upr),
    dzp: Number(ksg.dzp),
    bs: Number(ksg.bs),
    lvl: Number(ksg.klvl),
  }
  // console.log(ksg.formula, userData)

  const tarif = evaluate(ksg.formula, userData)
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
      <div className={styles.quotients}>
        <Icon
          type="fa-info-circle"
          size="fa-1x"
          title={`Уровень: ${ksg.lvl}\nКоэффициент уровня: ${Number(ksg.klvl)}\nКоэффициент затратоемкости: ${Number(ksg.koz)}\nУправленческий коэффициент: ${Number(ksg.upr)}\nКоэффициент доли заработной платы: ${Number(ksg.dzp)}\nБазовая ставка: ${ksg.bs}\nКоэффициент уровня: ${ksg.usedLvl ? 'Применяется' : 'Не применяется'}\nФормула: ${ksg.formula}\nТариф: ${tarif.toFixed(2)}`}
          icon="icon-info"
        />
      </div>
      <div className={styles.adult}>
        <div className={styles.adultInfo}>
          <InputUI variant="input-count-ksg" onchange={(e) => handlerChangeCountKsg(e, setCountAdult, preSaveCountAdult)} value={countAdult} placeholder="Взрослые" />
          <span className={styles.adultRub}>
            <NumericFormat value={countAdult * tarif.toFixed(2)} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
          </span>
        </div>
      </div>
      <div className={styles.child}>
        <div className={styles.childInfo}>
          <InputUI variant="input-count-ksg" onchange={(e) => handlerChangeCountKsg(e, setCountChild, preSaveCountChild)} value={countChild} placeholder="Дети" />
          <span className={styles.childRub}>
            <NumericFormat value={countChild * tarif.toFixed(2)} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
          </span>
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.totalInfo}>
          <InputUI variant="input-count-ksg" value={Number(countAdult) + Number(countChild)} placeholder="Сумма" disabled={true} />
          <span className={styles.totalRub}>
            <NumericFormat value={countAdult * tarif.toFixed(2) + countChild * tarif.toFixed(2)} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} />
          </span>
        </div>
      </div>
    </div>
  )
})
