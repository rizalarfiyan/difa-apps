import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const useRouter = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  return useMemo(() => {
    return {
      pathname: location.pathname,
      query: {
        ...params,
      },
      location,
      navigate,
    }
  }, [params, location])
}

export default useRouter
