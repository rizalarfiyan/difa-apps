import React from 'react'
import { Link } from 'react-router-dom'
import BaseError from './Base'

function NotFoundError() {
  return (
    <BaseError code={404} title='Page Not Found'>
      <div className='mt-2'>
        The Page you are looking for doesn&apos;t exist or an other error
        occured. Go to{' '}
        <Link to='/' className='text-gray-700 underline'>
          home page
        </Link>
        .
      </div>
    </BaseError>
  )
}

export default NotFoundError
