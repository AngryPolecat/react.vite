import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], groups: [], currentGroup: null, filterDataset: '', variants: [] }

const datasetSztSlice = createSlice({
  name: 'datasetSzt',
  initialState,
  reducers: {
    setDatasetSzt(state, action) {
      state.dataset = action.payload.dataset.map((ksg) => ({ ...ksg, choice: false, status: null, showMenu: false, currentAdult: ksg.adult, currentChild: ksg.child }))
      state.groups = action.payload.groups.map((grp) => ({ ...grp, status: null }))
      state.variants = action.payload.variants.map((variant) => ({ ...variant }))
    },
    setFilterDataset(state, action) {
      state.filterDataset = action.payload
    },
    setCurrentGroup(state, action) {
      state.currentGroup = action.payload
    },
    choiceKsg(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, choice: !ksg.choice } : ksg))
    },
    setCurrentCount(state, action) {
      state.dataset = state.dataset.map((ksg) =>
        ksg.id === action.payload.ksg
          ? {
              ...ksg,
              status: Number(ksg.adult) === Number(action.payload.adult) && Number(ksg.child) === Number(action.payload.child) ? null : 'update',
              currentAdult: Number(action.payload.adult),
              currentChild: Number(action.payload.child),
            }
          : ksg,
      )
    },
    applyUpdateDataset(state, action) {
      state.dataset = state.dataset
        .filter((ksg) => ksg.status !== 'remove' && ksg)
        .map((ksg) => (ksg.status === 'new' || ksg.status === 'update' ? { ...ksg, adult: Number(ksg.currentAdult), child: Number(ksg.currentChild), status: null, choice: false } : ksg))
      state.groups = state.groups.map((group) => ({ ...group, status: null }))
    },
    addKsgToDataset(state, action) {
      const groupAlreadyExists = state.groups.findIndex((group) => group.grp === action.payload.grp)
      if (groupAlreadyExists === -1) {
        const newGroup = {
          grp: action.payload.grp,
          description: action.payload.description,
          status: 'new',
        }
        state.groups.push(newGroup)
      }
      const ksgAlreadyExists = state.dataset.findIndex((ksg) => ksg.fed === action.payload.fed && ksg.lvl === action.payload.lvl) // по сути нах не нужна проверка
      if (ksgAlreadyExists === -1) {
        state.dataset.push(action.payload)
      }
    },
    markingForDeletion(state, action) {
      state.dataset = state.dataset.map((ksg) => (ksg.choice && ksg.status !== 'new' ? { ...ksg, choice: false, status: 'remove' } : ksg))
    },
  },
})

export default datasetSztSlice.reducer

export const {
  setDatasetSzt,
  setFilterDataset,
  setCurrentGroup,
  choiceKsg,
  setCurrentCount,
  applyUpdateDataset,
  addKsgToDataset,
  markingForDeletion,
  // removeFromDataset,
  // openMenuKsg,
  // closeMenuKsg,
  // cancelKsg,
  // cancelRemoveFromDataset,
  // clearAllVariant,
} = datasetSztSlice.actions
