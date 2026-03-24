import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], dataset2: [], currentGroup: null, filterDataset: '' }

const datasetModelSlice = createSlice({
  name: 'datasetModel',
  initialState,
  reducers: {
    setDatasetModel(state, action) {
      state.dataset = action.payload.dataset.map((ksg) => ({ ...ksg, choice: false, status: null, showMenu: false }))
      state.dataset2 = action.payload.dataset2.map((grp) => ({ ...grp, status: null }))
      // state.currentGroup = null
    },
    setCurrentGroup(state, action) {
      state.currentGroup = action.payload
    },
    setFilterDataset(state, action) {
      state.filterDataset = action.payload
    },
    addToDataset(state, action) {
      const groupAlreadyExists = state.dataset2.findIndex((grp) => grp.kd_gr_ksg === action.payload.kd_gr_ksg)
      if (groupAlreadyExists === -1) {
        const newGroup = {
          kd_gr_ksg: action.payload.kd_gr_ksg,
          name: action.payload.grp,
          q_ad: 0,
          q_ch: 0,
          q_il: 0,
          st_all: 0,
          st_ad: 0,
          st_ch: 0,
          status: 'new',
        }
        state.dataset2.push(newGroup)
      }
      const ksgAlreadyExists = state.dataset.findIndex((ksg) => ksg.fed === action.payload.ksg)
      if (ksgAlreadyExists === -1) {
        state.dataset.push(action.payload)
      }
    },
    removeFromDataset(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.choice ? { ...ksg, choice: false, status: 'remove' } : ksg))
    },
    openMenuKsg(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, showMenu: !ksg.showMenu } : { ...ksg, showMenu: false }))
    },
    closeMenuKsg(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, showMenu: false } : ksg))
    },
    choiceKsg(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, choice: !ksg.choice } : ksg))
    },
    cancelKsg(state, action) {
      state.dataset = state.dataset.map((ksg) => ({ ...ksg, choice: false }))
    },
    cancelRemoveFromDataset(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.status === 'remove' ? { ...ksg, status: null } : ksg))
    },
    clearAllVariant(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.kd_gr_ksg === action.payload || !action.payload ? { ...ksg, choice: false, status: 'remove' } : ksg))
    },
    applyUpdateVariant(state, action) {
      state.dataset = state.dataset.filter((ksg) => ksg.status !== 'remove' && ksg)
    },
  },
})

export default datasetModelSlice.reducer

export const {
  setDatasetModel,
  setCurrentGroup,
  setFilterDataset,
  addToDataset,
  removeFromDataset,
  openMenuKsg,
  closeMenuKsg,
  choiceKsg,
  cancelKsg,
  cancelRemoveFromDataset,
  clearAllVariant,
  applyUpdateVariant,
} = datasetModelSlice.actions
