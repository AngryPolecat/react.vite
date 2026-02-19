import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './listLpuModel.module.css'
import { loaderData } from '../../utils/loaderData'
import { URL, SETTINGS, WARNING_MESSAGE } from '../../const/const'
import { FilterListLpu } from './filterListLpu'
import { FilterPanel } from '../../components/filterPanel/filterPanel'
import { setListLpu, filteringLpu } from './listLpuSlice'
import { showMessage } from '../../optionsSlice'
import { Lpu } from './lpu'
import { Pangination } from '../../UI/pangination/pangination'

export const ListLpuModel = ({ modelId }) => {
  const dispatch = useDispatch()
  const lpu = useSelector((state) => state.listLpu.filteredLpu)
  const countPanginations = useSelector((state) => state.listLpu.filteredLpu.length / SETTINGS.LIMIT_LPU_ON_PAGE)
  const [currentPagePanginations, setCurrentPagePanginations] = useState(1)
  const filterPanel = useSelector((state) => state.options.filterPanel)

  useEffect(() => {
    const data = { modelId }
    loaderData(URL.URL_GET_LIST_LPU, data)
      .then((result) => {
        // console.log(result)
        if (result.error) {
          return
        }
        dispatch(setListLpu(result.dataset))
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE(error.message))))
      .finally(() => {
        //
      })
  }, [])

  const handlerPrevPage = () => {
    setCurrentPagePanginations((prev) => prev - 1)
  }

  const handlerNextPage = () => {
    setCurrentPagePanginations((prev) => prev + 1)
  }

  const handlerFilterLpu = (name, mcod, ate) => {
    dispatch(filteringLpu({ name, mcod, ate }))
  }

  return (
    <div className={styles.container}>
      <div>
        <FilterPanel>{filterPanel && <FilterListLpu onChange={handlerFilterLpu} />}</FilterPanel>
      </div>
      <div className={styles.list}>
        <div className={styles.header}>
          <div className={styles.description}>
            <span>Список медицинских организаций</span>
            {countPanginations > 1 && <Pangination pages={countPanginations} current={currentPagePanginations} onClickPrev={handlerPrevPage} onClickNext={handlerNextPage} />}
          </div>
        </div>
        <div className={styles.headerListLpu}>
          <div className={styles.headerCodeLpu}>Код</div>
          <div className={styles.headerNameLpu}>Наименование</div>
          <div className={styles.headerInnLpu}>ИНН</div>
          <div className={styles.headerMenuLpu}>
            <div className={styles.headerMenuLpuCorrect}>&nbsp;</div>
          </div>
        </div>
        <ul>
          {lpu.map(
            (org, index) =>
              (currentPagePanginations - 1) * SETTINGS.LIMIT_LPU_ON_PAGE <= index &&
              SETTINGS.LIMIT_LPU_ON_PAGE * currentPagePanginations - 1 >= index && (
                <li className={styles.lpu} key={org.mcod}>
                  <Lpu lpu={org} />
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  )
}
