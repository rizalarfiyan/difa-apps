import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Icon from './Icon'

const data = {
  width: 24,
  height: 24,
  name: 'info',
}

/*
 * test scenarios for Icon component
 *
 * - should not handle name correctly
 * - should handle name correctly
 * - should handle height correctly
 * - should handle width correctly
 *
 */
describe('Icon component', () => {
  it('should not handle name correctly', () => {
    render(<Icon name='notfound' data-testid='icon' />)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })

  it('should handle name correctly', () => {
    render(<Icon name={data.name} data-testid='icon' />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should handle height correctly', () => {
    render(<Icon name={data.name} height={data.height} data-testid='icon' />)
    expect(screen.getByTestId('icon')).toHaveAttribute(
      'height',
      data.height.toString()
    )
  })

  it('should handle width correctly', () => {
    render(<Icon name={data.name} width={data.width} data-testid='icon' />)
    expect(screen.getByTestId('icon')).toHaveAttribute(
      'width',
      data.width.toString()
    )
  })
})
