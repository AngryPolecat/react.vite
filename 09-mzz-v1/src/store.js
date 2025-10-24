import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './features/login/currentUserSlice'
import listModelsSlice from './features/listModels/listModelsSlice'
import optionsSlice from './optionsSlice'

const rootReducers = { currentUser: currentUserSlice, listModels: listModelsSlice, options: optionsSlice }

export const store = configureStore({
  reducer: rootReducers,
})
