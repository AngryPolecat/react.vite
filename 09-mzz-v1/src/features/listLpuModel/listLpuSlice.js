import { createSlice } from '@reduxjs/toolkit'

const initialState = { lpu: [], filteredLpu: [], currentLpu: null }

const listLpuSlice = createSlice({
  name: 'listLpu',
  initialState,
  reducers: {
    setListLpu(state, action) {
      state.lpu = action.payload.map((lpu) => ({ ...lpu, showMenu: false }))
      state.filteredLpu = action.payload.map((lpu) => ({ ...lpu, showMenu: false }))
    },
    filteringLpu(state, action) {
      console.log(action.payload)
      state.filteredLpu = state.lpu.filter(
        (org) =>
          org.mcod.indexOf(action.payload.mcod) !== -1 &&
          org.name.toLowerCase().indexOf(action.payload.name.toLowerCase()) !== -1 &&
          (Number(org.ate) === Number(action.payload.ate) || !action.payload.ate),
      )
    },
    openMenuLpu(state, action) {
      state.filteredLpu = state.filteredLpu.map((org) => (org.mcod === action.payload ? { ...org, showMenu: !org.showMenu } : { ...org, showMenu: false }))
    },
    closeMenuLpu(state, action) {
      //state.filteredLpu = state.filteredLpu.map((org) => (org.mcod === action.payload ? { ...org, showMenu: false } : org))
    },
    setCurrentLpu(state, action) {
      state.currentLpu = action.payload
    },
  },
})

export default listLpuSlice.reducer

export const { setListLpu, filteringLpu, openMenuLpu, closeMenuLpu, setCurrentLpu } = listLpuSlice.actions
