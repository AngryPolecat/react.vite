import { createSlice } from '@reduxjs/toolkit'

const initialState = { years: [], currentYear: {}, ate: [], currentAte: {} }

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.years = action.payload.years
      state.ate = action.payload.ate
      state.currentYear = action.payload.years[0]
      state.currentAte = action.payload.ate[0]
    },
    changeCurrentYear(state, action) {
      state.currentYear = action.payload
    },
    changeCurrentAte(state, action) {
      state.currentAte = action.payload
    },
  },
})

export default listsSlice.reducer

export const { setLists, changeCurrentYear, changeCurrentAte } = listsSlice.actions
