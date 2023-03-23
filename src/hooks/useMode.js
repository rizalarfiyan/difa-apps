import { MODE, STORAGE_KEY } from '@constants'
import { storage } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { global } from '@features'

const useMode = () => {
  const dispatch = useDispatch()
  const globalData = useSelector(global.slice.state)

  return {
    isDark: globalData.isDark,
    getInitialMode,
    setMode,
  }
}

export default useMode
