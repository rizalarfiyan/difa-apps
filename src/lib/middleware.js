import { auth } from '@features'
import { isRejectedWithValue } from '@reduxjs/toolkit'

const rtkQueryErrorHandle = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status === 404) {
      api.dispatch(auth.slice.action.logout())
    }
  }
  return next(action)
}

export default {
  rtkQueryErrorHandle,
}
