import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@utils'

function HeadingTitle({ title, className, ...rest }) {
  return (
    <div
      className={classNames(
        'relative flex items-start justify-center',
        className
      )}
      {...rest}
    >
      <h1 className='text-2xl font-semibold text-gray-700 dark:text-white'>
        {title}
      </h1>
      <div className='my-auto ml-4 flex-grow border-t border-gray-200 dark:border-gray-600' />
    </div>
  )
}

HeadingTitle.defaultProps = {
  className: 'mb-10',
}

HeadingTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default HeadingTitle
