import { createSlice } from '@reduxjs/toolkit'
import api from './services'

const slice = createSlice({
  name: 'leaderboards',
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.leaderboards.matchFulfilled,
      (state, { payload }) => {
        state = payload?.data?.leaderboards || []
      }
    )
  },
})

export default {
  state: (state) => state.leaderboards,
  reducer: slice.reducer,
  action: slice.actions,
}
