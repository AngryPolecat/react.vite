import { useReducer, useRef } from 'react'
import './App.css'

const initialState = { count: 0, inputValue: '' }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'reset':
      return { ...state, count: 0 }
    case 'increment5':
      return { ...state, count: state.count + payload }
    case 'incrementBy':
      return { ...state, count: state.count + Number(state.inputValue), inputValue: '' }
    case 'updateInput':
      return { ...state, inputValue: payload }
    default:
      return state
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handlerIncrementBy = () => {
    dispatch({ type: 'incrementBy' })
  }

  return (
    <div>
      <p>{state.count}</p>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'increment5', payload: 5 })}>+5</button>
      </div>
      <div>
        <input type="number" value={state.inputValue} onChange={({ target }) => dispatch({ type: 'updateInput', payload: target.value })} />
        <button onClick={handlerIncrementBy}>Увеличить на</button>
      </div>
    </div>
  )
}
