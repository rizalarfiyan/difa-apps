import { useDispatch } from 'react-redux'
import { Notification } from '@components'
import { COMPONENTS } from '@constants'

const useNotification = () => {
  const dispatch = useDispatch()

  const getMessage = (message) => {
    if (typeof message === 'object') {
      return (
        message?.data?.message ||
        message?.error ||
        message?.status ||
        'Something Wrong!'
      )
    }
    return message
  }

  return {
    success: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.success,
          content: {
            message: getMessage(message),
            duration,
          },
        })
      )
    },
    error: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.error,
          content: {
            message: getMessage(message),
            duration,
          },
        })
      )
    },
    info: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.info,
          content: {
            message: getMessage(message),
            duration,
          },
        })
      )
    },
    warning: (message, duration) => {
      dispatch(
        Notification.slice.action.add({
          type: COMPONENTS.notification.type.warning,
          content: {
            message: getMessage(message),
            duration,
          },
        })
      )
    },
  }
}

export default useNotification
