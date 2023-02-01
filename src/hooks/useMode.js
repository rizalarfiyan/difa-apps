import { MODE, STORAGE_KEY } from '@constants'
import { storage } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { global } from '@features'

const useMode = () => {
  const dispatch = useDispatch()
  const globalData = useSelector(global.slice.state)

  const getInitialMode = () => {
    const getStorage = storage.get(STORAGE_KEY.theme)
    const getUserMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return getStorage === MODE.dark || (!getStorage && getUserMode)
  }

  const setMode = (mode = undefined) => {
    dispatch(global.slice.action.setDarkMode(mode))
  }

  return {
    isDark: globalData.isDark,
    getInitialMode,
    setMode,
  }
}

export default useMode
