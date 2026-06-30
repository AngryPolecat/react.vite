import { createSlice } from '@reduxjs/toolkit'

const initialState = { dataset: [], filterDataset: '' }

const datasetOdliSlice = createSlice({
  name: 'datasetOdli',
  initialState,
  reducers: {
    setDatasetOdli(state, action) {
      state.dataset = action.payload.dataset.map((odli) => ({ ...odli, choice: false, status: null, showMenu: false, currentCount: odli.cnt }))
    },
    setFilterDataset(state, action) {
      state.filterDataset = action.payload
    },
    choiceOdli(state, action) {
      state.dataset = state.dataset.map((odli) => (odli.id === action.payload ? { ...odli, choice: !odli.choice } : odli))
    },
    setCurrentCountOdli(state, action) {
      state.dataset = state.dataset.map((odli) =>
        odli.id === action.payload.id
          ? {
              ...odli,
              status: Number(odli.cnt) === Number(action.payload.count) ? null : 'update',
              currentCount: Number(action.payload.count),
            }
          : odli,
      )
    },
    applyUpdateDataset(state, action) {
      state.dataset = state.dataset
        .filter((odli) => odli.status !== 'remove' && odli)
        .map((odli) => (odli.status === 'new' || odli.status === 'update' ? { ...odli, cnt: Number(odli.currentCount), status: null, choice: false } : odli))
    },
    // addKsgToDataset(state, action) {
    //   const groupAlreadyExists = state.groups.findIndex((group) => group.grp === action.payload.grp)
    //   if (groupAlreadyExists === -1) {
    //     const newGroup = {
    //       grp: action.payload.grp,
    //       description: action.payload.description,
    //       status: 'new',
    //     }
    //     state.groups.push(newGroup)
    //   }
    //   const ksgAlreadyExists = state.dataset.findIndex((ksg) => ksg.fed === action.payload.fed && ksg.lvl === action.payload.lvl) // по сути нах не нужна проверка
    //   if (ksgAlreadyExists === -1) {
    //     state.dataset.push(action.payload)
    //   }
    // },
    markingForDeletion(state, action) {
      state.dataset = state.dataset.map((odli) => (odli.choice && odli.status !== 'new' ? { ...odli, choice: false, status: 'remove' } : odli))
    },
  },
})

export default datasetOdliSlice.reducer

export const { setDatasetOdli, setFilterDataset, choiceOdli, markingForDeletion, setCurrentCountOdli, applyUpdateDataset } = datasetOdliSlice.actions
