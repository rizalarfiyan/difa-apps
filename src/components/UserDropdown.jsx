import React, { useRef, useState } from 'react'
import { classNames, getAvatar } from '@utils'
import { useAuth, useClickOutside, useNotification } from '@hooks'
import { ROUTE } from '@constants'
import { Link, Icon } from '@components'

function UserDropdown() {
  const { isLoggedIn, user, logout } = useAuth()
  const notification = useNotification()

  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleLogout = (event) => {
    logout()
    notification.success('Success Logout!')
    event.preventDefault()
  }

  useClickOutside(() => {
    setIsOpen(false)
  }, wrapperRef)

  if (isLoggedIn) {
    return (
      <div className='relative' ref={wrapperRef}>
        <div
          className='ml-2 h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-gray-200 dark:bg-gray-400'
          onClick={toggleDropdown}
          aria-hidden='true'
        >
          <img src={getAvatar(user.name)} alt={user.name} />
        </div>
        <div
          className={classNames(
            'absolute right-0 z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow transition-all duration-300 dark:divide-gray-600 dark:bg-gray-700',
            isOpen ? 'opacity-1 visible top-16' : 'invisible top-20 opacity-0'
          )}
        >
          <div className='px-4 py-2'>
            <h4 className='truncate text-base font-medium text-gray-700 dark:text-gray-100'>
              {user.name}
            </h4>
            <p className='truncate text-sm text-gray-600 dark:text-gray-300'>
              {user.email}
            </p>
          </div>
          <ul className='py-1 text-left text-sm text-gray-700 dark:text-gray-200'>
            <li>
              <button
                type='button'
                onClick={handleLogout}
                className='flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={ROUTE.login}
      rightIcon={<Icon name='login' className='ml-2 h-5 w-5' />}
    >
      Login
    </Link>
  )
}

export default UserDropdown
