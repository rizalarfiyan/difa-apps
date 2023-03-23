import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Alert from './Alert'

const data = {
  message: 'ini adalah alert',
}

/*
 * test scenarios for Alert component
 *
 * - should handle message correctly
 * - should handle children correctly
 * - should handle variant danger correctly
 * - should handle variant warning
 * - should handle variant success
 * - should handle variant info correctly
 *
 */
describe('Alert component', () => {
  it('should handle message correctly', () => {
    render(<Alert message={data.message} />)
    expect(screen.getByRole('alert')).toHaveTextContent(data.message)
  })

  it('should handle children correctly', () => {
    render(<Alert>{data.message}</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent(data.message)
  })

  it('should handle variant danger correctly', () => {
    render(<Alert variant='danger' message={data.message} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100 text-red-700')
  })

  it('should handle variant warning', () => {
    render(<Alert variant='warning' message={data.message} />)
    expect(screen.getByRole('alert')).toHaveClass(
      'bg-yellow-100 text-yellow-700'
    )
  })

  it('should handle variant success', () => {
    render(<Alert variant='success' message={data.message} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100 text-green-700')
  })

  it('should handle variant info correctly', () => {
    render(<Alert variant='info' message={data.message} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100 text-blue-700')
  })
})
