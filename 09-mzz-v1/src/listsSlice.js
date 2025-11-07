import { createSlice } from '@reduxjs/toolkit'

const initialState = { years: [], currentYear: {} }

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.years = action.payload.years
      state.currentYear = action.payload.years[0]
    },
    changeCurrentYear(state, action) {
      state.currentYear = action.payload
    },
  },
})

export default listsSlice.reducer

export const { setLists, changeCurrentYear } = listsSlice.actions
