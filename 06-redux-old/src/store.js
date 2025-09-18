import { applyMiddleware, combineReducers, createStore } from 'redux'
import { userListReducer } from './features/usersList/userListReducer'
import { userDetailsReducer } from './features/userDetails/userDetailsReducer'
import { thunk } from 'redux-thunk'

export const store = createStore(combineReducers({ userListReducer, userDetailsReducer }), applyMiddleware(thunk))
