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
      state.quotient = action.payload.quotient.map((quotient) => ({ ...quotient, status: null, choice: false, currentKoz: quotient.koz, currentUpr: quotient.upr, currentDzp: quotient.dzp }))
      state.groupQuotient = action.payload.group
    },
    setCurrentGroupQuotient(state, action) {
      state.currentGroupQuotient = action.payload
    },
    resetChoiceQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) =>
        quotient.choice
          ? {
              ...quotient,
              status: Number(quotient.koz) === 0 && Number(quotient.upr) === 0 && Number(quotient.dzp) === 0 ? null : 'update',
              currentKoz: Number(0),
              currentUpr: Number(0),
              currentDzp: Number(0),
            }
          : quotient,
      )
    },
    resetAllQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) => {
        const resetQuotient = {
          ...quotient,
          status: Number(quotient.koz) === 0 && Number(quotient.upr) === 0 && Number(quotient.dzp) === 0 ? null : 'update',
          currentKoz: Number(0),
          currentUpr: Number(0),
          currentDzp: Number(0),
        }
        if (state.filterQuotient) {
          return quotient.fed.toLowerCase().includes(state.filterQuotient.toLowerCase()) || quotient.name.toLowerCase().includes(state.filterQuotient.toLowerCase()) ? resetQuotient : quotient
        } else {
          if (state.currentGroupQuotient) {
            return Number(quotient.grp) === Number(state.currentGroupQuotient) ? resetQuotient : quotient
          } else {
            return resetQuotient
          }
        }
      })
    },
    applyUpdateQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) => ({
        ...quotient,
        koz: Number(quotient.currentKoz),
        upr: Number(quotient.currentUpr),
        dzp: Number(quotient.currentDzp),
        status: null,
        choice: false,
      }))
    },
    choiceQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) => (quotient.ksg === action.payload ? { ...quotient, choice: !quotient.choice } : quotient))
    },
    setFilterQuotient(state, action) {
      state.filterQuotient = action.payload
    },
    setCurrentQuotient(state, action) {
      state.quotient = state.quotient.map((quotient) =>
        quotient.ksg === action.payload.ksg
          ? {
              ...quotient,
              status:
                Number(quotient.koz) === Number(action.payload.koz) && Number(quotient.upr) === Number(action.payload.upr) && Number(quotient.dzp) === Number(action.payload.dzp) ? null : 'update',
              currentKoz: Number(action.payload.koz),
              currentUpr: Number(action.payload.upr),
              currentDzp: Number(action.payload.dzp),
            }
          : quotient,
      )
    },
  },
})

export default listQuotientSlice.reducer

export const { setListQuotient, setCurrentGroupQuotient, choiceQuotient, setFilterQuotient, setCurrentQuotient, resetAllQuotient, applyUpdateQuotient, resetChoiceQuotient } = listQuotientSlice.actions
