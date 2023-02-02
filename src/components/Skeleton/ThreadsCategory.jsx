import React from 'react'

function ThreadsCategory() {
  return (
    <div
      role='status'
      className='flex w-44 animate-pulse items-center justify-between gap-4 rounded-md bg-white p-2.5 shadow-lg dark:bg-gray-600 md:w-full'
    >
      <span className='h-8 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700' />
      <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700' />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default ThreadsCategory
