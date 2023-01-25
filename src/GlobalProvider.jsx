import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '@features'
import { storage, validAuth } from '@utils'
import { STORAGE_KEY } from '@constants'
import { LoadingScreen } from '@components'

function GlobalProvider({ children }) {
  const getAuth = useSelector(auth.slice.state)
  const dispatch = useDispatch()
  const [userInfo, { isLoading }] = auth.services.useUserInfoMutation()
  const isMounted = useRef(false)

  const parseUserAuth = async () => {
    const getToken = storage.get(STORAGE_KEY.token)
    if (!validAuth(getToken)) {
      dispatch(auth.slice.action.logout())
      return
    }
    if (!getAuth.token) {
      dispatch(
        auth.slice.action.addToken({
          token: getToken,
        })
      )
    }
    if (!getAuth.auth) {
      try {
        await userInfo().unwrap()
      } catch (err) {
        dispatch(auth.slice.action.logout())
      }
    }
  }

  useEffect(() => {
    if (isMounted.current) {
      parseUserAuth()
      return
    }
    isMounted.current = true
  }, [])

  if (!isLoading) {
    return children
  }

  return <LoadingScreen reason='Fetch user info...' />
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
