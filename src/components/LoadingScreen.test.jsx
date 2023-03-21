import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoadingScreen from './LoadingScreen'

const data = {
  reason: 'This is reason',
}

describe('LoadingScreen component', () => {
  it('should handle reason correctly', () => {
    render(<LoadingScreen reason={data.reason} data-testid='loading-screen' />)
    expect(screen.getByTestId('loading-screen')).toHaveTextContent(data.reason)
  })

  it('should handle empty reason correctly', () => {
    render(<LoadingScreen data-testid='loading-screen' />)
    expect(screen.getByTestId('loading-screen')).toHaveTextContent('')
  })
})
