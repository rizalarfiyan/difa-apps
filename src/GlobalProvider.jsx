import React from 'react'
import PropTypes from 'prop-types'
import { auth } from '@features'
import { storage, validAuth } from '@utils'
import { STORAGE_KEY } from '@constants'
import { LoadingScreen } from '@components'
import { useAuth, useEffectOnce } from '@hooks'

function GlobalProvider({ children }) {
  const { isLoggedIn, hasToken, logout, addToken } = useAuth()
  const [userInfo, { isLoading }] = auth.services.useUserInfoMutation()

  const parseUserAuth = async () => {
    const getToken = storage.get(STORAGE_KEY.token)
    if (!validAuth(getToken)) {
      logout()
      return
    }
    if (!hasToken) addToken(getToken)
    if (!isLoggedIn) {
      try {
        await userInfo().unwrap()
      } catch (err) {
        logout()
      }
    }
  }

  useEffectOnce(() => {
    parseUserAuth()
  })

  if (!isLoading) {
    return children
  }

  return <LoadingScreen reason='Fetch user info...' />
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalProvider
