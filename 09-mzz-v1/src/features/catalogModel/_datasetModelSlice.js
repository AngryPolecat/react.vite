// openMenuKsg(state, action) {
//   state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, showMenu: !ksg.showMenu } : { ...ksg, showMenu: false }))
// },
// closeMenuKsg(state, action) {
//   state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, showMenu: false } : ksg))
// },
// choiceKsg(state, action) {
//   state.dataset = state.dataset.map((ksg) => (ksg.id === action.payload ? { ...ksg, choice: !ksg.choice } : ksg))
// },
// cancelKsg(state, action) {
//   state.dataset = state.dataset.map((ksg) => ({ ...ksg, choice: false }))
// },
// cancelRemoveFromDataset(state, action) {
//   state.dataset = state.dataset.map((ksg) => (ksg.status === 'remove' ? { ...ksg, status: null } : ksg))
// },
// clearAllVariant(state, action) {
//   state.dataset = state.dataset.map((ksg) => (ksg.kd_gr_ksg === action.payload || !action.payload ? { ...ksg, choice: false, status: 'remove' } : ksg))
// },
// applyUpdateVariant(state, action) {
//   state.dataset = state.dataset.filter((ksg) => ksg.status !== 'remove' && ksg).map((ksg) => ({ ...ksg, choice: false, status: null }))
// },
