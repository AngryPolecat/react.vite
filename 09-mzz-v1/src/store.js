import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from './features/login/currentUserSlice'

const rootReducers = { currentUser: currentUserSlice }

export const store = configureStore({
  reducer: rootReducers,
})
