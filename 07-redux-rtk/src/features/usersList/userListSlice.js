import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:9000/users'

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk('userList/fethUsers', async (_, { rejectWithValue }) => {
  try {
    const result = await fetch(URL)
    if (!result.ok) {
      return rejectWithValue({ status: result.status, error: 'Failed to fetch users' })
    }
    return result.json()
  } catch (error) {
    return rejectWithValue({ status: 500, error: 'Failed to fetch users' })
  }
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
    showLog(state, action) {
      console.log(state, action.payload)
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
      console.log(action.payload)

      state.loading = false
      state.error = `${action.payload.status} ${action.payload.error}`
      state.users = []
    })
  },
})

export default userListSlice.reducer

export const { addUser, deleteUser } = userListSlice.actions
