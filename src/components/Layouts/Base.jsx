import React from 'react'
import { Button, Icon, Link, Navbar } from '@components'
import { Outlet } from 'react-router-dom'
import { ROUTE } from '@constants'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '@features'

function BaseLayout() {
  const getAuth = useSelector(auth.slice.state)
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    dispatch(auth.slice.action.logout())
    event.preventDefault()
  }

  return (
    <>
      <Navbar>
        <div className='flex items-center gap-2'>
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
          {!getAuth.user ? (
            <Link
              to={ROUTE.login}
              rightIcon={<Icon name='login' className='ml-2 h-5 w-5' />}
            >
              Login
            </Link>
          ) : (
            <Button
              type='button'
              onClick={handleLogout}
              rightIcon={<Icon name='logout' className='ml-2 h-5 w-5' />}
            >
              Logout
            </Button>
          )}
        </div>
      </Navbar>
      <Outlet />
    </>
  )
}

export default BaseLayout
