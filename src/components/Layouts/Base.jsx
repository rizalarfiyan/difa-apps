import React from 'react'
import { Button, Icon, Link, Navbar, UserDropdown } from '@components'
import { Outlet } from 'react-router-dom'
import { ROUTE } from '@constants'
import { useAuth, useMode } from '@hooks'

function BaseLayout() {
  const { isDark, setMode } = useMode()
  const { isLoggedIn } = useAuth()

  const handleToggleMode = (event) => {
    setMode()
    event.preventDefault()
  }

  return (
    <>
      <Navbar>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <Button
            className='rounded-full !px-2'
            type='button'
            variant='outline-info'
            onClick={handleToggleMode}
          >
            <Icon name={isDark ? 'light' : 'dark'} className='h-5 w-5' />
          </Button>
          <Link
            to={ROUTE.threads}
            rightIcon={<Icon name='thread' className='ml-2 h-5 w-5' />}
          >
            Threads
          </Link>
          <Link
            to={ROUTE.leaderboards}
            rightIcon={<Icon name='leaderboard' className='ml-2 h-5 w-5' />}
          >
            Leaderboards
          </Link>
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <Link
              to={ROUTE.login}
              rightIcon={<Icon name='login' className='ml-2 h-5 w-5' />}
            >
              Login
            </Link>
          )}
        </div>
      </Navbar>
      <Outlet />
      {isLoggedIn && (
        <Link
          to={ROUTE.createThread}
          className='!fixed bottom-8 right-8 rounded-full bg-white !px-2.5 !py-6 dark:bg-gray-500'
        >
          <Icon name='plus' className='h-7 w-7' />
        </Link>
      )}
    </>
  )
}

export default BaseLayout
