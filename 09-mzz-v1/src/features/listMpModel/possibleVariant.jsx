import { useSelector } from 'react-redux'
import styles from './possibleVariant.module.css'
import { TYPEPOM } from '../../const/const'
import { VariantSt } from './typepom/st/variantSt'

export const PossibleVariant = () => {
  const currentTypepom = useSelector((state) => state.lists.currentTypepom)

  switch (currentTypepom) {
    case TYPEPOM.ST:
      return (
        <div className={styles.container}>
          <VariantSt />
        </div>
      )
    case TYPEPOM.AMB:
      return <div className={styles.container}>Амбулаторная помощь</div>
    case TYPEPOM.DSP:
      return <div className={styles.container}>Диспансеризация</div>
    case TYPEPOM.INO:
      return <div className={styles.container}>Инообластные</div>
    case TYPEPOM.ODLI:
      return <div className={styles.container}>ОДЛИ</div>
    case TYPEPOM.SMP:
      return <div className={styles.container}>Скорая помощь</div>
    case TYPEPOM.SZT:
      return <div className={styles.container}>Дневной стационар</div>
  }
}
