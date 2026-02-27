import { createSlice } from '@reduxjs/toolkit'

const initialState = { years: [], currentYear: {}, ate: [], currentAte: {}, typepom: [], currentTypepom: null }

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists(state, action) {
      state.years = action.payload.years
      state.ate = action.payload.ate
      state.typepom = action.payload.typepom
      state.currentYear = action.payload.years[0]
      state.currentAte = action.payload.ate[0]
      state.currentTypepom = action.payload.typepom[0].code
    },
    changeCurrentYear(state, action) {
      state.currentYear = action.payload
    },
    changeCurrentAte(state, action) {
      state.currentAte = action.payload
    },
    changeCurrentTypepom(state, action) {
      state.currentTypepom = action.payload
    },
    // changeCurrentYearModel(state, action) {
    //   state.currentYearModel = action.payload
    // },
  },
})

export default listsSlice.reducer

export const { setLists, changeCurrentYear, changeCurrentAte, changeCurrentTypepom } = listsSlice.actions
