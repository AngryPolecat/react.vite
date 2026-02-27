import { createSlice } from '@reduxjs/toolkit'

const initialState = { departments: [], currentDepartment: null }

const listDepartmentSlice = createSlice({
  name: 'listDepartment',
  initialState,
  reducers: {
    setListDepartment(state, action) {
      state.departments = action.payload
      state.currentDepartment = action.payload[0].id
    },
    setCurrentDepartment(state, action) {
      state.currentDepartment = action.payload
    },
  },
})

export default listDepartmentSlice.reducer

export const { setListDepartment, setCurrentDepartment } = listDepartmentSlice.actions
