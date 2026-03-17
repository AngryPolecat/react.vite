import { createSlice } from '@reduxjs/toolkit'

const initialState = { departments: [], currentDepartment: { id: null, code: null } }

const listDepartmentSlice = createSlice({
  name: 'listDepartment',
  initialState,
  reducers: {
    setListDepartment(state, action) {
      state.departments = action.payload
      state.currentDepartment = { id: action.payload[0].id, code: action.payload[0].code }
    },
    setCurrentDepartment(state, action) {
      state.currentDepartment = action.payload
    },
  },
})

export default listDepartmentSlice.reducer

export const { setListDepartment, setCurrentDepartment } = listDepartmentSlice.actions
