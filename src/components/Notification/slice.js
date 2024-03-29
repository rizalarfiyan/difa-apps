import { COMPONENTS } from '@constants'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearAll: () => initialState,
    add: (state, { payload }) => {
      state.data = [
        ...state.data,
        {
          id: payload.id || (+new Date()).toString(),
          type: payload.type,
          content: {
            message: payload.content.message || '',
            duration:
              payload.content.duration || COMPONENTS.notification.duration,
          },
        },
      ]
    },
    remove: (state, { payload }) => {
      state.data = state.data.filter((val) => val.id !== payload.id)
    },
  },
})

export default {
  state: (state) => state.notifications.data,
  reducer: slice.reducer,
  action: slice.actions,
  initialState,
}
