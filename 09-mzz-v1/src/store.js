import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './features/login/currentUserSlice'
import listModelsSlice from './features/listModels/listModelsSlice'
import optionsSlice from './optionsSlice'
import listsSlice from './listsSlice'
import listLpuSlice from './features/listLpuModel/listLpuSlice'
import listDepartmentSlice from './features/listMpModel/listDepartmentSlice'

const rootReducers = { currentUser: currentUserSlice, listModels: listModelsSlice, options: optionsSlice, lists: listsSlice, listLpu: listLpuSlice, listDepartment: listDepartmentSlice }

export const store = configureStore({
  reducer: rootReducers,
})
