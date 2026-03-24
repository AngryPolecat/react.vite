import { createSlice } from '@reduxjs/toolkit'

const initialState = { lpu: [], filteredLpu: [], currentLpu: {} }

/* Описание ЛПУ
  ate: "1" - код АТЕ
  dstart: "2021-04-01" - начало действия ЛПУ
  dstop: "3000-12-31" - конец действия ЛПУ
  id: "12341" - id ЛПУ
  inn: "4246006426" - ИНН ЛПУ
  lvl: "2.2" - уровень ЛПУ
  mcod: "420001" - МКОД
  name: "ГАУЗ \"Анжеро-Судженская городская больница имени А.А. Гороховского\"" - наименование
  showMenu: false - показать контекстное меню
  uuid - генерируемый uuid для строки браузера
*/

//currentLpu: { mcod: null, uuid: null, id: null, name: null }

const listLpuSlice = createSlice({
  name: 'listLpu',
  initialState,
  reducers: {
    setListLpu(state, action) {
      state.lpu = action.payload.map((lpu) => ({ ...lpu, showMenu: false }))
      state.filteredLpu = action.payload.map((lpu) => ({ ...lpu, showMenu: false }))
    },
    filteringLpu(state, action) {
      state.filteredLpu = state.lpu.filter(
        (org) =>
          org.mcod.indexOf(action.payload.mcod) !== -1 &&
          org.name.toLowerCase().indexOf(action.payload.name.toLowerCase()) !== -1 &&
          (Number(org.ate) === Number(action.payload.ate) || !action.payload.ate),
      )
    },
    openMenuLpu(state, action) {
      state.filteredLpu = state.filteredLpu.map((org) => (org.mcod === action.payload ? { ...org, showMenu: !org.showMenu } : { ...org, showMenu: false }))
    },
    closeMenuLpu(state, action) {
      //state.filteredLpu = state.filteredLpu.map((org) => (org.mcod === action.payload ? { ...org, showMenu: false } : org))
    },
    setCurrentLpu(state, action) {
      state.currentLpu = action.payload
    },
  },
})

export default listLpuSlice.reducer

export const { setListLpu, filteringLpu, openMenuLpu, closeMenuLpu, setCurrentLpu } = listLpuSlice.actions
