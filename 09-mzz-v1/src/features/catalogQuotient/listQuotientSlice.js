import { createSlice } from '@reduxjs/toolkit'

const initialState = { quotient: [], groupQuotient: [], currentGroupQuotient: null, filterQuotient: '', filteredQuotient: [] }

/* Описание коэффициентов
  quotient - массив коэффициентов полученный из базы
  groupQuotient - массив групп ксг полученный из базы
  currentGroup - выбранная группа ксг
  filterQuotient - текст фильтра ксг
  filteredQuotient - отфильтрованный массив коэффициентов

  year_z: 2026 - код подразделения
  variant_tp: 100 - дата начала действия
  ksg: 10 - дата конца действия
  id: "145884" - uuid коэффициента
  k_ksg_ad: 0.301 - коэффициент затратоемкости (взр)
  k_upr: 0.11 - управленческий коэффициент
  k_ksg_ch: 0.501 - коэффициент затратоемкости (дет)
  kd_var_ksg: 13 - вариант ксг
  k_dzp: 0.00091 - коэффициент доли заработной планы
  ksg_f: 'st02.001' - федеральный код ксг
  status: 'update' - статус коэффициента в store
*/

const listQuotientSlice = createSlice({
  name: 'listQuotient',
  initialState,
  reducers: {
    setListQuotient(state, action) {
      state.quotient = action.payload.quotient.map((quotient) => ({ ...quotient, status: null, choice: false }))
      state.groupQuotient = action.payload.group
    },
    setCurrentGroupQuotient(state, action) {
      state.currentGroupQuotient = action.payload
    },
    resetAllQuotient(state, action) {
      state.quotient = state.quotient
    },
    applyUpdateQuotient(state, action) {
      state.quotient = state.quotient
    },
    choiceQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) => (quotient.ksg === action.payload ? { ...quotient, choice: !quotient.choice } : quotient))
    },
    setFilterQuotient(state, action) {
      state.filterQuotient = action.payload
    },
  },
})

export default listQuotientSlice.reducer

export const { setListQuotient, setCurrentGroupQuotient, choiceQuotient, setFilterQuotient } = listQuotientSlice.actions
