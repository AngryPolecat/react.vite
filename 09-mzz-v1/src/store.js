import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './features/login/currentUserSlice'
import listModelsSlice from './features/listModels/listModelsSlice'
import optionsSlice from './optionsSlice'
import listsSlice from './listsSlice'

const rootReducers = { currentUser: currentUserSlice, listModels: listModelsSlice, options: optionsSlice, lists: listsSlice }

export const store = configureStore({
  reducer: rootReducers,
})
