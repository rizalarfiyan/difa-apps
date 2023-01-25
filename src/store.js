import { api } from '@lib'
import { configureStore } from '@reduxjs/toolkit'
import { auth } from '@features'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: auth.slice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  },
})

export default store
