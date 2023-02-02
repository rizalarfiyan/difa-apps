import React from 'react'
import PropTypes from 'prop-types'

function Leaderboards({ num, user, score }) {
  return (
    <div className='relative flex items-center justify-between rounded-md border-2 border-transparent bg-white p-3 shadow-lg transition-colors duration-300 hover:border-blue-500 dark:bg-gray-600'>
      <div className='flex w-full items-center gap-3'>
        <span className='w-6 py-4 text-center text-xl font-semibold text-gray-700 dark:text-white'>
          {num}
        </span>
        <div className='h-16 w-16 min-w-[64px] overflow-hidden rounded-md bg-gray-200 dark:bg-gray-400'>
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className='truncate'>
          <h3 className='truncate text-xl font-semibold text-gray-700 dark:text-white'>
            {user.name}
          </h3>
          <span className='truncate text-sm text-gray-500 dark:text-gray-300'>
            {user.email}
          </span>
        </div>
      </div>
      <div className='p- absolute right-0 -top-6 mr-0 rounded-full bg-white p-1.5 dark:bg-gray-600 xxs:relative xxs:top-0 xxs:mr-2 xxs:rounded-none xxs:p-0 xxs:dark:bg-transparent'>
        <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 font-semibold text-blue-500 dark:border-blue-200 dark:text-blue-200'>
          {score}
        </div>
      </div>
    </div>
  )
}

Leaderboards.propTypes = {
  num: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
}

export default Leaderboards
