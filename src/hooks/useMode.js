import { MODE, STORAGE_KEY } from '@constants'
import { storage } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import global from '../slice'

const useMode = () => {
  const dispatch = useDispatch()
  const globalData = useSelector(global.state)

  const getInitialMode = () => {
    const getStorage = storage.get(STORAGE_KEY.theme)
    const getUserMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return getStorage === MODE.dark || (!getStorage && getUserMode)
  }

  const setMode = (mode = undefined) => {
    dispatch(global.action.setDarkMode(mode))
  }

  return {
    isDark: globalData.isDark,
    getInitialMode,
    setMode,
  }
}

export default useMode
