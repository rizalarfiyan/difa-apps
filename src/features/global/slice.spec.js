import slice from './slice'

const isDarkData = {
  ...slice.initialState,
  isDark: true,
}

describe('slice of global data', () => {
  test('should return the initial state when given by unknown action', () => {
    const nextState = slice.reducer(slice.initialState, { type: 'unknown' })
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return reset reducer', () => {
    const nextState = slice.reducer(isDarkData, slice.action.reset())
    expect(nextState).toStrictEqual(slice.initialState)
  })

  test('should return serDarkMode true when given by setDarkMode true action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.setDarkMode(true)
    )
    expect(nextState).toStrictEqual(isDarkData)
  })

  test('should return serDarkMode true when given by setDarkMode false action', () => {
    const nextState = slice.reducer(
      slice.initialState,
      slice.action.setDarkMode(false)
    )
    expect(nextState).toStrictEqual(slice.initialState)
  })
})
