import { api } from '@lib'
import { configureStore } from '@reduxjs/toolkit'
import { auth } from '@features'
import { Notification } from '@components'
import globalSlice from './slice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    global: globalSlice.reducer,
    auth: auth.slice.reducer,
    notifications: Notification.slice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  },
})

export default store
