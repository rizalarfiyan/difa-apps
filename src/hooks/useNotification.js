import { useDispatch } from 'react-redux'
import { Notification } from '@components'
import { COMPONENTS } from '@constants'

const useNotification = () => {
  const dispatch = useDispatch()
  return {
    success: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.success,
          message,
          duration,
        })
      )
    },
    error: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.error,
          message,
          duration,
        })
      )
    },
    info: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.info,
          message,
          duration,
        })
      )
    },
    warning: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.warning,
          message,
          duration,
        })
      )
    },
  }
}

export default useNotification
