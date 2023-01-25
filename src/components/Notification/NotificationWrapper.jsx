import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import NotificationMessage from './NotificationMessage'
import slice from './slice'

function NotificationWrapper({ position }) {
  const dispatch = useDispatch()
  const rawNotifications = useSelector(slice.state)

  const getPosition = useMemo(() => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0'
      case 'bottom-right':
        return 'bottom-0 right-0'
      case 'bottom-left':
        return 'bottom-0 left-0'
      case 'top-middle':
        return 'top-0 left-1/2 -translate-x-1/2 transform'
      case 'bottom-middle':
        return 'bottom-0 left-1/2 -translate-x-1/2 transform'
      default:
        return 'top-0 right-0'
    }
  }, [])

  const handleRemove = (id) => {
    dispatch(
      slice.action.remove({
        id,
      })
    )
  }

  const notifications = useMemo(() => {
    return rawNotifications || []
  }, [rawNotifications])

  return (
    <div
      className={classNames(
        'pointer-events-none fixed z-50 max-h-screen w-full overflow-hidden p-4 md:max-w-sm md:p-4',
        getPosition
      )}
    >
      <div className='fade pointer-events-none mr-8 w-full flex-1 flex-col justify-end'>
        {notifications.map((val) => {
          return (
            <div
              key={val.id}
              className='pointer-events-auto flex w-full transform py-1 transition-all duration-300'
            >
              <NotificationMessage
                id={val.id.toString()}
                message={val.content.message}
                type={val.type}
                duration={val.content.duration}
                onRemove={handleRemove}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

NotificationWrapper.defaultProps = {
  position: 'top-right',
}

NotificationWrapper.propTypes = {
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-right',
    'bottom-left',
    'top-middle',
    'bottom-middle',
  ]),
}

export default NotificationWrapper
