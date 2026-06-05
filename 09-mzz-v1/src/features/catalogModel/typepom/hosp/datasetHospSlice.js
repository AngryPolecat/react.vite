import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], groups: [], currentGroup: null, filterDataset: '' }

const datasetHospSlice = createSlice({
  name: 'datasetHosp',
  initialState,
  reducers: {
    setDatasetHosp(state, action) {
      state.dataset = action.payload.dataset.map((ksg) => ({ ...ksg, choice: false, status: null, showMenu: false, currentAdult: ksg.adult, currentChild: ksg.child }))
      state.groups = action.payload.groups.map((grp) => ({ ...grp, status: null }))
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
      state.dataset = state.dataset.map((ksg) => ({
        ...ksg,
        adult: Number(ksg.currentAdult),
        child: Number(ksg.currentChild),
        status: null,
        choice: false,
      }))
    },
  },
})

export default datasetHospSlice.reducer

export const {
  setDatasetHosp,
  setFilterDataset,
  setCurrentGroup,
  choiceKsg,
  setCurrentCount,
  applyUpdateDataset,
  // addToDataset,
  // removeFromDataset,
  // openMenuKsg,
  // closeMenuKsg,
  // cancelKsg,
  // cancelRemoveFromDataset,
  // clearAllVariant,
} = datasetHospSlice.actions
