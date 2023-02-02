import { API_BASE_URL } from '@constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { progress } from '@lib'

const nprogress = {
  counter: 0,
  start() {
    this.counter += 1
    if (!progress.isStarted()) {
      progress.start()
    }
  },
  complete() {
    this.counter -= 1
    if (this.counter === 0) {
      progress.done()
    }
  },
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithProgress = async (args, api, extraOptions) => {
  try {
    nprogress.start()
    const result = await baseQuery(args, api, extraOptions)
    nprogress.complete()
    return result
  } catch (err) {
    nprogress.complete()
    throw err
  }
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithProgress,
  tagTypes: ['User', 'Leaderboard', 'Thread'],
  endpoints: () => ({}),
})

export default api
