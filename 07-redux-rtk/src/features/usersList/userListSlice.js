import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:9000/users'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk('userList/fethUsers', async () => {
  const result = await fetch(URL)
  return result.json()
})

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload)
    },
    deleteUser(state, action) {
      const deleteUser = state.users.findIndex((user) => user.id === action.payload)
      state.users.splice(deleteUser, 1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
      state.error = null
      state.users = []
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.users = []
    })
  },
})

export default userListSlice.reducer

export const { addUser, deleteUser } = userListSlice.actions
