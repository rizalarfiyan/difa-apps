import React from 'react'

function Comment() {
  return (
    <div
      role='status'
      className='relative flex w-full animate-pulse flex-col gap-5 rounded-md bg-white p-4 shadow-lg dark:bg-gray-600 sm:p-6 md:p-8'
    >
      <div className='flex w-full items-center justify-between gap-3'>
        <div className='flex w-full items-center gap-3'>
          <div className='h-16 w-16'>
            <div className='h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-700' />
          </div>
          <div className='w-full space-y-2'>
            <div className='h-5 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700' />
            <div className='h-3 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <div className='h-3 w-full rounded-md bg-gray-200 dark:bg-gray-700' />
        <div className='h-3 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700' />
      </div>
      <div className='flex items-center gap-3'>
        <div className='h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700' />
        <div className='h-8 w-20 rounded-md bg-gray-200 dark:bg-gray-700' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Comment
