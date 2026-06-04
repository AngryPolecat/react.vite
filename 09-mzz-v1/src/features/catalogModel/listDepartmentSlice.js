import { createSlice } from '@reduxjs/toolkit'

const initialState = { departments: [], currentDepartment: {} }

/* Описание подразделения
  code: "294" - код подразделения
  dstart: "2025-10-01" - дата начала действия
  dstop: "3000-12-31" - дата конца действия
  id: "145884" - id подразделения
  lvl: "1.3" - уровень подразделения
  name: "Стационар 1.3" - наименование подразделения
*/

//{ id: null, code: null }

const listDepartmentSlice = createSlice({
  name: 'listDepartment',
  initialState,
  reducers: {
    setListDepartment(state, action) {
      state.departments = action.payload
      state.currentDepartment = action.payload[0]
    },
    setCurrentDepartment(state, action) {
      state.currentDepartment = action.payload
    },
  },
})

export default listDepartmentSlice.reducer

export const { setListDepartment, setCurrentDepartment } = listDepartmentSlice.actions
