import { STORAGE_KEY } from '@constants'
import { createSlice } from '@reduxjs/toolkit'
import { storage } from '@utils'
import api from './services'

const initialState = {
  user: null,
  token: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      storage.remove(STORAGE_KEY.token)
      return initialState
    },
    addToken: (state, { payload }) => {
      state.token = payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        const token = payload.data.token ?? null
        if (!token) return
        state.token = token
        storage.set(STORAGE_KEY.token, token)
      })
      .addMatcher(
        api.endpoints.userInfo.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data.user ?? null
        }
      )
  },
})

export default {
  state: (state) => state.auth,
  reducer: slice.reducer,
  action: slice.actions,
}
