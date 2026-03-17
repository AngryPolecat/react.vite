import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], dataset2: [], currentGroup: null }

const datasetModelSlice = createSlice({
  name: 'datasetModel',
  initialState,
  reducers: {
    setDatasetModel(state, action) {
      state.dataset = action.payload.dataset
      state.dataset2 = action.payload.dataset2
      // state.currentGroup = null
    },
    setCurrentGroup(state, action) {
      state.currentGroup = action.payload
    },
  },
})

export default datasetModelSlice.reducer

export const { setDatasetModel, setCurrentGroup } = datasetModelSlice.actions
