import React from 'react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '@constants'

function Title() {
  return (
    <h1 className='text-2xl font-semibold text-gray-700 dark:text-white'>
      <Link to='/'>{APP_NAME}</Link>
    </h1>
  )
}

export default Title
