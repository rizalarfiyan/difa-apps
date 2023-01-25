import { useEffect, useRef } from 'react'

const useEffectOnce = (effect) => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      effect()
      return
    }
    isMounted.current = true
  }, [])
}

export default useEffectOnce
