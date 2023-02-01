import { createSlice } from '@reduxjs/toolkit'
import api from './services'

const initialState = {
  lists: [],
  categories: [],
}

const slice = createSlice({
  name: 'threads',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getThreads.matchFulfilled,
      (state, { payload }) => {
        state.lists = payload.data.threads
        state.categories = [
          ...new Set(payload.data.threads.map(({ category }) => category)),
        ]
      }
    )
  },
})

export default {
  state: (state) => state.threads,
  reducer: slice.reducer,
  action: slice.actions,
}
