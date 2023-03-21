import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'

/*
 * test scenarios for Spinner component
 *
 * - should handle size xs correctly
 * - should handle size sm correctly
 * - should handle size md correctly
 * - should handle size lg correctly
 * - should handle size xl correctly
 *
 */
describe('Spinner component', () => {
  it('should handle size xs correctly', () => {
    render(<Spinner size='xs' data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toHaveClass('w-3 h-3')
  })

  it('should handle size sm correctly', () => {
    render(<Spinner size='sm' data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toHaveClass('w-4 h-4')
  })

  it('should handle size md correctly', () => {
    render(<Spinner size='md' data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toHaveClass('w-6 h-6')
  })

  it('should handle size lg correctly', () => {
    render(<Spinner size='lg' data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toHaveClass('w-8 h-8')
  })

  it('should handle size xl correctly', () => {
    render(<Spinner size='xl' data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toHaveClass('w-12 h-12')
  })
})
