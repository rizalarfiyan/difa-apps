import React from 'react'
import PropTypes from 'prop-types'

function BaseError({ code, title, subtitle, children }) {
  return (
    <div className='mistake-error mx-auto flex min-h-screen w-full max-w-[320px] flex-col items-center justify-center text-center leading-snug'>
      {code && (
        <h1 className='-mb-8 text-8xl font-bold tracking-wider text-gray-200 dark:text-gray-700'>
          {code}
        </h1>
      )}
      {title && (
        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-400'>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className='mt-2 text-gray-500 dark:text-gray-400'>{subtitle}</p>
      )}
      {children}
    </div>
  )
}

BaseError.defaultProps = {
  code: 500,
  title: 'Internal Server Error',
  subtitle: '',
}

BaseError.propTypes = {
  code: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default BaseError
