export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'INC':
      return { ...state, candidates: state.candidates.map((candidate) => (candidate.id === payload ? { ...candidate, votes: candidate.votes + 1 } : candidate)) }
    case 'DEC':
      return { ...state, candidates: state.candidates.map((candidate) => (candidate.id === payload ? { ...candidate, votes: candidate.votes - 1 } : candidate)) }
    case 'GETDATA':
      return { ...state, candidates: payload }
    case 'RESET':
      return { ...state, candidates: state.candidates.map((candidate) => ({ ...candidate, votes: 0 })) }
    case 'ADD':
      return state.newbie ? { ...state, candidates: [...state.candidates, { id: payload, name: state.newbie, votes: 0 }], newbie: '' } : { ...state }
    case 'INPUT':
      return { ...state, newbie: payload }
    default:
      return { ...state }
  }
}
