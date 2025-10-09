import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null, fio: '' }

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.token = action.payload.token
      state.fio = action.payload.fio
    },
    clearCurrentUser(state, action) {
      state.token = null
      state.fio = ''
    },
  },
})

export default currentUserSlice.reducer

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions
