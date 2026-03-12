import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.role = action.payload.role
    },
    clearUser: (state) => {
      state.user = null
      state.role = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer