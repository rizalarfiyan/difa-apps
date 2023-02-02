import { api, middleware } from '@lib'
import { configureStore } from '@reduxjs/toolkit'
import { global, auth, leaderboards, threads } from '@features'
import { Notification } from '@components'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    notifications: Notification.slice.reducer,
    global: global.slice.reducer,
    auth: auth.slice.reducer,
    leaderboards: leaderboards.slice.reducer,
    threads: threads.slice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      api.middleware,
      middleware.rtkQueryErrorHandle,
    ])
  },
})

export default store
