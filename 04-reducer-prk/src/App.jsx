import { useReducer } from 'react'
import './App.css'

// 1. С помощью хука useReducer создайте виджет для отображения текущей даты.
// 2. В параграфе должна отображаться текущая дата в формате: Fri Dec 27 2025.
// 3. Кнопка Reset должна сбрасывать дату на текущую.
// 4. В поле ввода (input) пользователь вводит количество дней, которые нужно прибавить к текущей дате.
// 5. При нажатии на кнопку Show result должна отображаться дата, полученная после прибавления введённого количества дней к текущей дате.

const initialState = { date: new Date(), inputValue: '' }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'increment':
      const newDate = new Date(state.date)
      newDate.setDate(newDate.getDate() + Number(state.inputValue))
      return { ...state, date: newDate, inputValue: '' }
    case 'reset':
      return { ...initialState }
    case 'input':
      return { ...state, inputValue: payload }
    default:
      return { ...state }
  }
}

const handlerIncrementDate = () => {}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="app-container">
      <p className="date-text">{state.date.toDateString()}</p>

      <button className="btn" onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>

      <div className="input-group">
        <input className="input" type="number" placeholder="Days after today" value={state.inputValue} onChange={({ target }) => dispatch({ type: 'input', payload: target.value })} />
        <button className="btn primary-btn" onClick={() => dispatch({ type: 'increment' })}>
          Show result
        </button>
      </div>
    </div>
  )
}
