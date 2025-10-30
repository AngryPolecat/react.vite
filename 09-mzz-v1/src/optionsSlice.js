import { createSlice } from '@reduxjs/toolkit'

const initialState = { loader: false, message: { text: '', type: null }, extraPanel: false }

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
    toggleExtraPanel(state, action) {
      state.extraPanel = action.payload
    },
  },
})

export default optionsSlice.reducer

export const { toggleLoader, showMessage, closeMessage, toggleExtraPanel } = optionsSlice.actions
