import { createSlice } from '@reduxjs/toolkit'
import { sortDate } from '@utils'
import api from './services'

const initialState = {
  lists: [],
  categories: [],
  detail: null,
  comments: [],
}

const slice = createSlice({
  name: 'threads',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getThreads.matchFulfilled,
        (state, { payload }) => {
          state.lists = payload.data.threads
          const categories = payload.data.threads.reduce(
            (acc, { category }) => {
              if (!acc[category]) {
                acc[category] = {
                  name: category,
                  count: 1,
                }
              } else {
                acc[category].count += 1
              }
              return acc
            },
            {}
          )
          state.categories = Object.values(categories)
        }
      )
      .addMatcher(
        api.endpoints.getThread.matchFulfilled,
        (state, { payload }) => {
          state.detail = payload.data.detailThread
          state.comments = sortDate(
            payload.data.detailThread.comments,
            (val) => val.createdAt
          )
        }
      )
      .addMatcher(
        api.endpoints.addComment.matchFulfilled,
        (state, { payload }) => {
          state.comments = sortDate(
            [...state.comments, payload.data.comment],
            (val) => val.createdAt
          )
        }
      )
  },
})

export default {
  state: (state) => state.threads,
  reducer: slice.reducer,
  action: slice.actions,
}
