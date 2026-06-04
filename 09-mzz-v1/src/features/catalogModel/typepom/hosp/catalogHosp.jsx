import { useSelector } from 'react-redux'
import styles from './catalogHosp.module.css'
import { Icon } from '../../../../UI/icons/icon'

export const CatalogHosp = () => {
  const currentGroup = useSelector((state) => state.datasetHosp.currentGroup)
  const statusGroupKsg = useSelector((state) => state.options.statusGroupKsg)

  const handlerChangeStatusGroupKsg = () => {}

  const handlerStatusMenu = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.activeBar}>
        <div className={styles.filterBar}>
          {!currentGroup && (
            <div className={styles.toggle}>
              {statusGroupKsg ? (
                <Icon type="fa-toggle-on" size="fa-2x" title="Показать по КСГ" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupKsg} />
              ) : (
                <Icon type="fa-toggle-off" size="fa-2x" title="Показать по группам" icon="icon-toggle-ksg" onclick={handlerChangeStatusGroupKsg} />
              )}
              <span className={styles.toggleText}>По группам</span>
            </div>
          )}
          {(currentGroup || !statusGroupKsg) && (
            <div className={styles.filter}>
              {/* <InputUI variant="input-filter-variant" onchange={(e) => handlerChangeFilter(e, setTextKsg)} value={textKsg} placeholder="Часть кода КСГ или названия" /> */}
            </div>
          )}
        </div>
        <div className={styles.menu}>
          <Icon type="fa-ellipsis-h" size="fa-1x" title="Показать меню" icon="icon-header-models-menu" onclick={handlerStatusMenu} />
          {/* {showMenu && (
            <DropMenu type="models-menu">
              {currentGroup && <div onClick={handlerClickReturnGroup}>Вернуться к группам</div>}
              <div onClick={() => handlerAddVariant()}>Добавить</div>
              {markedForSaving.length ? <div onClick={() => handlerSaveVariant()}>Применить изменения</div> : null}
              {comparedKsg.length ? <div onClick={() => handlerCancelVariant()}>Отменить выделение</div> : null}
              {markedForDeletion.length ? <div onClick={() => handlerCancelRemoveVariant()}>Снять пометку на удаление</div> : null}
              {comparedKsg.length ? <div>Перенести выбранные</div> : null}
              {comparedKsg.length ? <div onClick={() => handlerRemoveVariant()}>Пометить на удаление</div> : null}
              <div onClick={() => handlerCleanVariant()}>Очистить весь список</div>
            </DropMenu>
          )} */}
        </div>
      </div>
    </div>
  )
}
