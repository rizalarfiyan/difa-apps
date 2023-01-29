import React from 'react'

function Leaderboards() {
  return (
    <div
      role='status'
      className='mx-auto flex w-full animate-pulse items-center justify-between gap-4 rounded-md bg-white p-3 shadow-lg dark:bg-gray-600'
    >
      <div className='flex w-full items-center gap-3'>
        <span className='h-4 w-8 rounded-md bg-gray-200 dark:bg-gray-700' />
        <div className='h-16 w-16'>
          <div className='h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-700' />
        </div>
        <div className='w-full space-y-2'>
          <div className='h-5 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700' />
          <div className='h-3 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700' />
        </div>
      </div>
      <div className='mr-3 h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700' />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Leaderboards
