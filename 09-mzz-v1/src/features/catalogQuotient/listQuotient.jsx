import { useSelector } from 'react-redux'
import styles from './listQuotient.module.css'
import { Quotient } from './quotient'

export const ListQuotient = () => {
  const filterQuotient = useSelector((state) => state.listQuotient.filterQuotient)
  const listQuotient = useSelector((state) => state.listQuotient.quotient)
    .slice()
    .filter((item) => item.fed.toLowerCase().includes(filterQuotient.toLowerCase()) || item.name.toLowerCase().includes(filterQuotient.toLowerCase()))
    .sort((a, b) => a.grp - b.grp || a.fed.localeCompare(b.fed))
  const currentGroupQuotient = useSelector((state) => state.listQuotient.currentGroupQuotient)

  return (
    <div className={styles.container}>
      <ul>
        {listQuotient.map(
          (quotient) =>
            (!currentGroupQuotient || currentGroupQuotient === quotient.grp) && (
              <li key={quotient.ksg} className={styles.data}>
                <Quotient quotient={quotient} />
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
