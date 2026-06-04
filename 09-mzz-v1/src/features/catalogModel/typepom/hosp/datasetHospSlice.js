import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], groups: [], currentGroup: null, filterDataset: '' }

const datasetHospSlice = createSlice({
  name: 'datasetHosp',
  initialState,
  reducers: {
    setDatasetHosp(state, action) {
      state.dataset = action.payload.dataset.map((ksg) => ({ ...ksg, choice: false, status: null, showMenu: false }))
      state.groups = action.payload.dataset2.map((grp) => ({ ...grp, status: null }))
    },
  },
})

export default datasetHospSlice.reducer

export const {
  setDatasetHosp,
  // setCurrentGroup,
  // setFilterDataset,
  // addToDataset,
  // removeFromDataset,
  // openMenuKsg,
  // closeMenuKsg,
  // choiceKsg,
  // cancelKsg,
  // cancelRemoveFromDataset,
  // clearAllVariant,
  // applyUpdateVariant,
} = datasetHospSlice.actions
