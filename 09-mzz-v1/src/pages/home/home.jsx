import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loaderData } from '../../utils/loaderData'
import { SETTINGS, URL, WARNING_MESSAGE } from '../../const/const'
import { closeMessage, showMessage, toggleLoader, toggleStatusLoadingLists } from '../../optionsSlice'
import { setLists } from '../../listsSlice'

export const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(toggleStatusLoadingLists(false))
    dispatch(toggleLoader(true))

    loaderData(URL.URL_LOAD_LISTS)
      .then((result) => {
        console.log(result)

        if (result.error) {
          dispatch(showMessage(WARNING_MESSAGE('Ошибка загрузки справочников. ' + result.msg)))
          return
        }
        dispatch(setLists(result.dataset))
        dispatch(toggleStatusLoadingLists(true))
        navigate('/models')
      })
      .catch((error) => dispatch(showMessage(WARNING_MESSAGE('Ошибка загрузки справочников. ' + error.message))))
      .finally(() => {
        setTimeout(() => dispatch(closeMessage()), SETTINGS.MESSAGE_OPENING_LIMIT)
        dispatch(toggleLoader(false))
      })
  }, [])

  return <></>
}
