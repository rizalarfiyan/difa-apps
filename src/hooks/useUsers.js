import { useSelector } from 'react-redux'
import { global } from '@features'

const useUsers = () => {
  const globalData = useSelector(global.slice.state)

  const arrUsers = Object.values(globalData.users)
  const findUserById = (userId) => {
    const user = globalData.users[userId]
    if (!user) {
      return {
        id: '',
        name: '',
        avatar: '',
        email: '',
      }
    }
    return user
  }

  return {
    users: arrUsers,
    userById: findUserById,
  }
}

export default useUsers
