import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: null, fio: '', session: null }

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.token = action.payload.token
      state.fio = action.payload.fio
      state.session = action.payload.session
    },
    clearCurrentUser(state, action) {
      state.token = null
      state.fio = ''
      state.session = null
    },
  },
})

export default currentUserSlice.reducer

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions
