import { useSelector } from 'react-redux'
import { useState } from 'react'
import styles from './listTarif.module.css'
import { Tarif } from './tarif'

export const ListTarif = () => {
  const currentDepartment = useSelector((state) => state.listTarif.currentDepartment)
  const filterTarif = useSelector((state) => state.listTarif.filterTarif)
  const tarif = useSelector((state) => state.listTarif.tarif)
    .slice()
    .filter(
      (item) =>
        item.usl.toLowerCase().includes(filterTarif.toLowerCase()) ||
        item.obst.toLowerCase().includes(filterTarif.toLowerCase()) ||
        item.uslName.toLowerCase().includes(filterTarif.toLowerCase()) ||
        item.obstName.toLowerCase().includes(filterTarif.toLowerCase()),
    )
    .filter(
      (item) =>
        Object.keys(currentDepartment).length === 0 ||
        Number(currentDepartment.code) === 0 ||
        (Number(currentDepartment.code) !== 0 && Number(item.atePodr) === Number(currentDepartment.kdate) && Number(item.podr) === Number(currentDepartment.code)),
    )
    .sort((a, b) => a.grp - b.grp || a.usl.localeCompare(b.usl))

  return (
    <div className={styles.container}>
      <ul>
        {tarif.map((tarif) => (
          <li key={tarif.idTarif} className={styles.data}>
            <Tarif tarif={tarif} />
          </li>
        ))}
      </ul>
    </div>
  )
}
