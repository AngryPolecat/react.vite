import { createSlice } from '@reduxjs/toolkit'

const initialState = { models: [] }

const listModelsSlice = createSlice({
  name: 'listModels',
  initialState,
  reducers: {
    setListModels(state, action) {
      state.models = action.payload.map((model) => ({ ...model, choice: false, showMenu: false }))
    },
    choiceModel(state, action) {
      state.models = state.models.map((model) => (model.uuid === action.payload ? { ...model, choice: !model.choice } : model))
    },
    openMenuModel(state, action) {
      state.models = state.models.map((model) => (model.uuid === action.payload ? { ...model, showMenu: !model.showMenu } : { ...model, showMenu: false }))
    },
    closeMenuModel(state, action) {
      state.models = state.models.map((model) => (model.uuid === action.payload ? { ...model, showMenu: false } : model))
    },
    addModel(state, action) {
      state.models.push({ ...action.payload, showMenu: false, choice: false })
    },
  },
})

export default listModelsSlice.reducer

export const { setListModels, choiceModel, openMenuModel, addModel, closeMenuModel } = listModelsSlice.actions
