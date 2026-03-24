import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '../../../../UI/icons/icon'
import styles from './ksg.module.css'
import { choiceKsg, openMenuKsg } from '../../datasetModelSlice'
// import { DropMenu } from '../../../../UI/dropMenu/dropMenu'

export const Ksg = ({ ksg }) => {
  console.log(ksg)

  const extraPanel = useSelector((state) => state.options.extraPanel)
  const dispatch = useDispatch()

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
          {ksg.grp} ({ksg.kd_gr_ksg})
        </div>
      </div>
      <div className={styles.info}>
        {ksg.status === 'remove' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Помечен на удаление" icon="icon-marked-remove" />}
        {ksg.status === 'new' && <Icon type="fa-exclamation-triangle" size="fa-1x" title="Новый элемент" icon="icon-marked-new" />}
      </div>
      <div className={styles.lvl}>{ksg.lvl}</div>
      <div className={styles.adult}>
        <div>{ksg.q_ad}</div>
        <div>{ksg.st_ad}</div>
      </div>
      <div className={styles.child}>
        <div>{ksg.q_ch}</div>
        <div>{ksg.st_ch}</div>
      </div>
      <div className={styles.total}>
        <div>{ksg.q_il}</div>
        <div>{ksg.st_all}</div>
      </div>
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
}
