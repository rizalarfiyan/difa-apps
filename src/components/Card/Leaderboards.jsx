import React from 'react'
import PropTypes from 'prop-types'

function Leaderboards({ num, user, score }) {
  return (
    <div className='flex items-center justify-between rounded-md border-2 border-transparent bg-white p-3 shadow-lg transition-colors duration-300 hover:border-blue-500 dark:bg-gray-500'>
      <div className='flex items-center gap-3'>
        <span className='py-4 px-2 text-xl font-semibold text-gray-700 dark:text-white'>
          {num}
        </span>
        <div className='h-16 w-16 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-400'>
          <img src={user.avatar} alt={user.name} />
        </div>
        <div>
          <h3 className='text-xl font-semibold text-gray-700 dark:text-white'>
            {user.name}
          </h3>
          <span className='text-sm text-gray-500 dark:text-gray-300'>
            {user.email}
          </span>
        </div>
      </div>
      <div className='mr-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 font-semibold text-blue-500 dark:border-blue-200 dark:text-blue-200'>
        {score}
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
