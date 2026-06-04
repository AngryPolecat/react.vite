import { createSlice } from '@reduxjs/toolkit'

/* Описание модели
  choice: false - в подборе
  created: "2026-01-01 00:00:00+07" - дата создания
  createdString: "01/01/2026 00:00" - дата создания для вывода на экран
  description: "КРТП от 29.12.2025" - описание
  editable: true - доступна для редактирования
  num: 1 - номер модели
  released: true - опубликована
  showMenu: false - показать контекстное меню
  uuid: "ac17f5ff-200b-4593-b405-f1778d880ab4" - id модели
  year: 2026 - год модели
*/

const initialState = { models: [], currentModel: {} }

const listModelsSlice = createSlice({
  name: 'listModels',
  initialState,
  reducers: {
    setListModels(state, action) {
      state.models = action.payload.map((model) => ({ ...model, choice: false, showMenu: false }))
    },
    setCurrentModel(state, action) {
      state.currentModel = action.payload
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

export const { setListModels, choiceModel, openMenuModel, addModel, closeMenuModel, setCurrentModel } = listModelsSlice.actions
