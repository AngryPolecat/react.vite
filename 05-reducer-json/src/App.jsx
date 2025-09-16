import { useEffect, useReducer } from 'react'
import './App.css'
import { fetchCandidates } from './utils/fetchCandidates'
import { reducer } from './utils/reducer'

const initialState = { candidates: [], newbie: '' }

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchCandidates().then((data) => dispatch({ type: 'GETDATA', payload: data }))
  }, [])

  const handlerIncrementVotes = (id) => {
    dispatch({ type: 'INC', payload: id })
  }

  const handlerDecrementVotes = (id) => {
    const currentCandidate = state.candidates.find((item) => item.id === id)
    if (currentCandidate.votes > 0) {
      dispatch({ type: 'DEC', payload: id })
    }
  }

  const handlerResetVotes = () => {
    dispatch({ type: 'RESET' })
  }

  const handlerChangeNewbie = (newbie) => {
    dispatch({ type: 'INPUT', payload: newbie })
  }

  const handlerAddNewbie = () => {
    const maxIdCandidates = state.candidates.map((candidate) => {
      return candidate.id
    })
    const maxId = Math.max(...maxIdCandidates)
    dispatch({ type: 'ADD', payload: maxId + 1 })
  }

  return (
    <div>
      <h1>Vote Tracker</h1>
      <ul>
        {state.candidates.map((candidate) => (
          <li key={candidate.id}>
            <span>
              {candidate.name}: {candidate.votes} votes
            </span>
            <button onClick={() => handlerIncrementVotes(candidate.id)}>+</button>
            <button onClick={() => handlerDecrementVotes(candidate.id)}>-</button>
          </li>
        ))}
      </ul>
      <button onClick={handlerResetVotes}>Reset Votes</button>
      <div>
        <h2>Add Candidate</h2>
        <input type="text" placeholder="Candidate name" value={state.newbie} onChange={({ target }) => handlerChangeNewbie(target.value)} />
        <button onClick={handlerAddNewbie}>Add</button>
      </div>
    </div>
  )
}
