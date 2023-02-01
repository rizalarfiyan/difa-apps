import { useDispatch } from 'react-redux'
import { Notification } from '@components'
import { COMPONENTS } from '@constants'

const useNotification = () => {
  const dispatch = useDispatch()

  const getMessage = (message) => {
    if (typeof message === 'object') {
      return message?.error || message?.status || 'Something Wrong!'
    }
    return message
  }

  return {
    success: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.success,
          message: getMessage(message),
          duration,
        })
      )
    },
    error: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.error,
          message: getMessage(message),
          duration,
        })
      )
    },
    info: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.info,
          message: getMessage(message),
          duration,
        })
      )
    },
    warning: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.warning,
          message: getMessage(message),
          duration,
        })
      )
    },
  }
}

export default useNotification
