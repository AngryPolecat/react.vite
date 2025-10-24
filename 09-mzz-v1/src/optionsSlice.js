import { createSlice } from '@reduxjs/toolkit'

const initialState = { loader: false, message: { text: '', type: null } }

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.loader = action.payload
    },
    showMessage(state, action) {
      state.message.text = action.payload.text
      state.message.type = action.payload.type
    },
    closeMessage(state, action) {
      state.message.text = ''
      state.message.type = null
    },
  },
})

export default optionsSlice.reducer

export const { toggleLoader, showMessage, closeMessage } = optionsSlice.actions
