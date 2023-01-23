import { createSlice } from '@reduxjs/toolkit'
import api from './services'

const initialState = {
  user: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.data.token ?? null
      })
      .addMatcher(
        api.endpoints.userInfo.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user ?? null
        }
      )
  },
})

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user
