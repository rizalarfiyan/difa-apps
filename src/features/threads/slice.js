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
        const categories = payload.data.threads.reduce((acc, { category }) => {
          if (!acc[category]) {
            acc[category] = {
              name: category,
              count: 1,
            }
          } else {
            acc[category].count += 1
          }
          return acc
        }, {})
        state.categories = Object.values(categories)
      }
    )
  },
})

export default {
  state: (state) => state.threads,
  reducer: slice.reducer,
  action: slice.actions,
}
