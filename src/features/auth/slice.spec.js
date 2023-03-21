import slice from './slice'

const hasTokenData = {
  ...slice.initialState,
  token: 'this is a token',
}

/*
 * test scenarios for slice of auth
 *
 * - should return the initial state when given by unknown action
 * - should return logout reducer
 * - should return filled addToken when given by filled addToken action
 * - should return empty addToken when given by empty addToken action
 *
 */
describe('slice of auth', () => {
  test('should return the initial state when given by unknown action', () => {
    const nextState = slice.reducer(slice.initialState, { type: 'unknown' })
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return logout reducer', () => {
    const nextState = slice.reducer(hasTokenData, slice.action.logout())
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return filled addToken when given by filled addToken action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.addToken({ token: hasTokenData.token })
    )
    expect(nextState).toStrictEqual(hasTokenData)
  })

  test('should return empty addToken when given by empty addToken action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.addToken({
        token: null,
      })
    )
    expect(nextState).toStrictEqual(slice.initialState)
  })
})
