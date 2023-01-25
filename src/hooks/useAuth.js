import { auth } from '@features'
import { useDispatch, useSelector } from 'react-redux'

const useAuth = () => {
  const getAuth = useSelector(auth.slice.state)
  const dispatch = useDispatch()

  return {
    isLoggedIn: !!getAuth.user,
    hasToken: !!getAuth.token,
    user: getAuth.user,
    logout: () => {
      dispatch(auth.slice.action.logout())
    },
    addToken: (token) => {
      dispatch(
        auth.slice.action.addToken({
          token,
        })
      )
    },
  }
}

export default useAuth
