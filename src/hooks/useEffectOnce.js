import { useEffect, useRef } from 'react'

const useEffectOnce = (effect) => {
  const isMounted = useRef(process.env.NODE_ENV === 'production')
  useEffect(() => {
    if (isMounted.current) {
      effect()
      return
    }
    isMounted.current = true
  }, [])
}

export default useEffectOnce
