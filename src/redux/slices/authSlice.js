import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    clearAuth: () => initialState
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer
