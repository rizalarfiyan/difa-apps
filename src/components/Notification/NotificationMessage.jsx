import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@utils'
import { COMPONENTS } from '@constants'
import { useEffectOnce } from '@hooks'
import Icon from '../Icon'

function NotificationMessage({ id, message, type, duration, onRemove }) {
  const getStyle = useMemo(() => {
    switch (type) {
      case COMPONENTS.notification.type.info:
        return {
          base: 'bg-white border-blue-500',
          iconstyle: 'text-blue-500',
          icon: 'info',
          name: 'Info',
        }
      case COMPONENTS.notification.type.error:
        return {
          base: 'bg-white border-red-500',
          iconstyle: 'text-red-500',
          icon: 'error',
          name: 'Error',
        }
      case COMPONENTS.notification.type.warning:
        return {
          base: 'bg-white border-yellow-500',
          iconstyle: 'text-yellow-500',
          icon: 'warning',
          name: 'Warning',
        }
      case COMPONENTS.notification.type.success:
        return {
          base: 'bg-white border-green-500',
          iconstyle: 'text-green-500',
          icon: 'success',
          name: 'Success',
        }
      default:
        return {}
    }
  }, [])

  useEffectOnce(() => {
    if (duration && onRemove) {
      setTimeout(() => {
        onRemove(id)
      }, duration)
    }
  })

  return (
    <div
      className={classNames(
        'hover:scale-102 visible flex max-h-40 w-full transform cursor-pointer flex-row rounded-md border-l-4 shadow-lg transition-all duration-100',
        getStyle.base
      )}
      onClick={() => onRemove && onRemove(id)}
      aria-hidden='true'
    >
      <div className='flex-no-wrap flex w-full flex-row gap-2 p-4'>
        {getStyle.icon && (
          <Icon
            name={getStyle.icon}
            className={classNames(
              'mx-auto mr-1 flex h-8 w-8 select-none items-center text-xl',
              getStyle.iconstyle
            )}
          />
        )}

        <div className='content flex-no-wrap flex w-full flex-col px-1'>
          <div className='my-auto flex select-none font-bold text-gray-800'>
            {getStyle.name}
          </div>
          <p className='my-auto flex break-all text-sm leading-tight text-gray-500 line-clamp-2'>
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

NotificationMessage.defaultProps = {
  message: '',
  type: COMPONENTS.notification.type.info,
  duration: COMPONENTS.notification.duration,
}

NotificationMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  duration: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
}

export default NotificationMessage
