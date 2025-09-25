import { configureStore } from '@reduxjs/toolkit'
import userListSlice from './features/usersList/userListSlice'
import userDetailsSlice from './features/userDetails/userDetailSlice'

const rootReducers = { userList: userListSlice, userDetails: userDetailsSlice }

export const store = configureStore({
  reducer: rootReducers,
})
