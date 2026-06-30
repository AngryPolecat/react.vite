import { createSlice } from '@reduxjs/toolkit'

const initialState = { tarif: [], departments: [], currentDepartment: {}, filterTarif: '', variants: [] }

/* Описание коэффициентов
  tarif - массив тарифов полученный из базы
  departments - массив подразделений ЛПУ
  currentDepartments - текущее подразделени
  filterTarif - текст фильтра
  variants - возможные варианты тарифов
*/

const listTarifSlice = createSlice({
  name: 'listTarif',
  initialState,
  reducers: {
    setListTarif(state, action) {
      state.tarif = action.payload.tarif.map((tarif) => ({ ...tarif, status: null, choice: false, currentCost: tarif.cost }))
      state.variants = action.payload.variants
    },
    setListDepartments(state, action) {
      state.departments = action.payload
      state.currentDepartment = action.payload[0]
    },
    setCurrentDepartment(state, action) {
      state.currentDepartment = action.payload
    },
    choiceTarif(state, action) {
      state.tarif = state.tarif.map((tarif) => (tarif.idTarif === action.payload ? { ...tarif, choice: !tarif.choice } : tarif))
    },
    setFilterTarif(state, action) {
      state.filterTarif = action.payload
    },
    setCurrentTarif(state, action) {
      state.tarif = state.tarif.map((tarif) =>
        tarif.idTarif === action.payload.id
          ? {
              ...tarif,
              status: Number(tarif.cost) === Number(action.payload.cost) ? null : 'update',
              currentCost: Number(action.payload.cost),
            }
          : tarif,
      )
    },
    markingForDeletion(state, action) {
      state.tarif = state.tarif.map((tarif) => (tarif.choice && tarif.status !== 'new' ? { ...tarif, choice: false, status: 'remove' } : tarif))
    },
    applyUpdateTarif(state, action) {
      state.tarif = state.tarif
        .filter((tarif) => tarif.status !== 'remove' && tarif)
        .map((tarif) => (tarif.status === 'new' || tarif.status === 'update' ? { ...tarif, cost: Number(tarif.currentCost), status: null, choice: false } : tarif))
    },
    addTarifToDataset(state, action) {
      const tarifAlreadyExists = state.tarif.findIndex((tarif) => tarif.idUsl === action.payload.idUsl && tarif.idObst === action.payload.idObst)
      if (tarifAlreadyExists === -1) {
        state.tarif.push(action.payload)
      }
    },
  },
})

export default listTarifSlice.reducer

export const { setListTarif, setListDepartments, setCurrentDepartment, choiceTarif, setFilterTarif, setCurrentTarif, markingForDeletion, applyUpdateTarif, addTarifToDataset } = listTarifSlice.actions
