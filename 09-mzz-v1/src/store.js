import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './features/login/currentUserSlice'
import optionsSlice from './optionsSlice'
import listsSlice from './listsSlice'
import listModelsSlice from './features/catalogModels/listModelsSlice'
import listLpuSlice from './features/catalogLpuModel/listLpuSlice'
import listDepartmentSlice from './features/catalogModel/listDepartmentSlice'
import listQuotientSlice from './features/catalogQuotient/listQuotientSlice'
import datasetHospSlice from './features/catalogModel/typepom/hosp/datasetHospSlice'
import datasetSztSlice from './features/catalogModel/typepom/szt/datasetSztSlice'

const rootReducers = {
  currentUser: currentUserSlice,
  options: optionsSlice,
  lists: listsSlice,
  listModels: listModelsSlice,
  listLpu: listLpuSlice,
  listDepartment: listDepartmentSlice,
  listQuotient: listQuotientSlice,
  datasetHosp: datasetHospSlice,
  datasetSzt: datasetSztSlice,
}

export const store = configureStore({
  reducer: rootReducers,
})
