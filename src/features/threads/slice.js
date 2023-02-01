import { createSlice } from '@reduxjs/toolkit'
import api from './services'

const initialState = {
  lists: [],
}

const slice = createSlice({
  name: 'threads',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.threads.matchFulfilled,
      (state, { payload }) => {
        state.lists = payload.data.threads
      }
    )
  },
})

export default {
  state: (state) => state.threads,
  reducer: slice.reducer,
  action: slice.actions,
}
