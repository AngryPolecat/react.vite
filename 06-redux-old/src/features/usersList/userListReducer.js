const initialState = { users: [], loading: false, error: false }
const API = 'http://localhost:9000/users'

export const userListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'userList/addUser':
      return { ...state, users: [...state.users, payload] }
    case 'userList/deleteUser':
      return { ...state, users: state.users.filter((user) => user.id != payload) }
    case 'userList/successLoadUsers':
      return { ...state, users: payload, loading: false, error: false }
    case 'userList/startLoadUsers':
      return { ...state, users: [], loading: true, error: false }
    case 'userList/errorLoadUsers':
      return { ...state, users: [], loading: false, error: true }
    default:
      return state
  }
}

export const loadUsers = () => {
  return async (dispatch) => {
    dispatch({ type: 'userList/startLoadUsers' })
    try {
      const result = await fetch(API)
      const data = await result.json()
      dispatch({ type: 'userList/successLoadUsers', payload: data })
    } catch (error) {
      dispatch({ type: 'userList/errorLoadUsers', payload: error })
    }
  }
}
