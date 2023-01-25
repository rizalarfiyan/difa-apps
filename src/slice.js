import { MODE, STORAGE_KEY } from '@constants'
import { createSlice } from '@reduxjs/toolkit'
import { storage } from '@utils'

const initialState = {
  isDark: false,
}

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    reset: () => initialState,
    setDarkMode: (state, { payload }) => {
      const isDark = typeof payload !== 'undefined' ? payload : !state.isDark
      state.isDark = isDark

      const mode = isDark ? MODE.dark : MODE.light
      storage.set(STORAGE_KEY.theme, mode)
      document.documentElement.dataset.mode = mode
    },
  },
})

export default {
  state: (state) => state.global,
  reducer: slice.reducer,
  action: slice.actions,
}
