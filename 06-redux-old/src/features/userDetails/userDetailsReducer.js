const initialState = { user: {} }

export const userDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'userDetails/selectedUser':
      return { ...state, user: payload }
    case 'userDetails/clearUser':
      return { ...state, user: {} }
    default:
      return state
  }
}
