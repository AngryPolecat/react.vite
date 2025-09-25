import { createSlice } from '@reduxjs/toolkit'

const initialState = { user: {} }

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload
    },
    clearUser(state, action) {
      state.user = {}
    },
  },
})

export default userDetailsSlice.reducer

export const { getUser, clearUser } = userDetailsSlice.actions
