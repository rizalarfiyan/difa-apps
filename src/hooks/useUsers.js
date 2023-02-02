import { useSelector } from 'react-redux'
import { auth, global } from '@features'

const useUsers = () => {
  const globalData = useSelector(global.slice.state)
  const authData = useSelector(auth.slice.state)

  const arrUsers = Object.values(globalData.users)
  const findUserById = (userId) => {
    const user = globalData.users[userId]
    if (!user) {
      return {
        id: '',
        name: 'Rizal Arfiyan',
        avatar: '',
        email: 'admin@admin.com',
      }
    }
    return user
  }

  return {
    me: authData.user,
    users: arrUsers,
    userById: findUserById,
  }
}

export default useUsers
