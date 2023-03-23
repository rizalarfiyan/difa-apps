import { COMPONENTS } from '@constants'
import slice from './slice'

const payloadData = {
  id: (+new Date()).toString(),
  type: COMPONENTS.notification.type.error,
  content: {
    message: 'This is a success message!',
    duration: COMPONENTS.notification.duration,
  },
}

/*
 * test scenarios for slice of notification components
 *
 * - should return the initial state when given by unknown action
 * - should return add reducer
 * - should return remove reducer
 *
 */
describe('slice of notification components', () => {
  test('should return the initial state when given by unknown action', () => {
    const nextState = slice.reducer(slice.initialState, { type: 'unknown' })
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return add reducer', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.add(payloadData)
    )
    expect(nextState.data).toStrictEqual([payloadData])
  })

  test('should return remove reducer', () => {
    const currentData = {
      data: [payloadData],
    }

    const nextState = slice.reducer(
      currentData,
      slice.action.remove({
        id: payloadData.id,
      })
    )
    expect(nextState).toStrictEqual(slice.initialState)
  })
})
