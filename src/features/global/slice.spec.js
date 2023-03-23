import slice from './slice'

const isDarkData = {
  ...slice.initialState,
  isDark: true,
}

/*
 * test scenarios for slice of global data
 *
 * - should return the initial state when given by unknown action
 * - should return reset reducer
 * - should return setDarkMode true when given by setDarkMode true action
 * - should return setDarkMode true when given by setDarkMode false action
 *
 */
describe('slice of global data', () => {
  test('should return the initial state when given by unknown action', () => {
    const nextState = slice.reducer(slice.initialState, { type: 'unknown' })
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return reset reducer', () => {
    const nextState = slice.reducer(isDarkData, slice.action.reset())
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return setDarkMode true when given by setDarkMode true action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.setDarkMode(true)
    )
    expect(nextState).toStrictEqual(isDarkData)
  })

  test('should return setDarkMode true when given by setDarkMode false action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.setDarkMode(false)
    )
    expect(nextState).toStrictEqual(slice.initialState)
  })
})
