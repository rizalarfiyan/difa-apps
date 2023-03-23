import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'
import Icon from './Icon'

const data = {
  message: 'This is button.',
  icon: <Icon name='info' data-testid='svg-icon' />,
}

/*
 * test scenarios for Button component
 *
 * - should handle children
 * - should call onClick when enabled
 * - should not call onClick when disable
 * - should handle not disabled
 * - should handle disabled
 * - should have type button
 * - should have type submit
 * - should handle is fluid
 * - should have right icon
 * - should have left icon
 * - should handle is loading
 * - should handle size xs
 * - should handle size sm
 * - should handle size lg
 * - should handle size xl
 * - should handle size md
 * - should handle variant danger
 * - should handle variant warning
 * - should handle variant success
 * - should handle variant info
 * - should handle size variant outline danger
 * - should handle size variant outline warning
 * - should handle size variant outline success
 * - should handle size variant outline info
 *
 */
describe('Button component', () => {
  it('should handle children correctly', () => {
    render(<Button data-testid='button'>{data.message}</Button>)
    expect(screen.getByTestId('button').textContent).toBe(data.message)
  })

  it('should call onClick when enabled', async () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} disabled={false} data-testid='button'>
        {data.message}
      </Button>
    )
    await userEvent.click(screen.getByTestId('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disable', async () => {
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} disabled data-testid='button'>
        {data.message}
      </Button>
    )
    await userEvent.click(screen.getByTestId('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should handle not disabled correctly', () => {
    render(<Button data-testid='button'>{data.message}</Button>)
    const button = screen.getByTestId('button')
    expect(button).not.toHaveAttribute('disabled')
    expect(button).toHaveAttribute('aria-disabled', 'false')
  })

  it('should handle disabled correctly', () => {
    render(
      <Button disabled data-testid='button'>
        {data.message}
      </Button>
    )
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should have type button correctly', () => {
    render(<Button data-testid='button'>{data.message}</Button>)
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'button')
  })

  it('should have type submit correctly', () => {
    render(
      <Button isSubmit data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'submit')
  })

  it('should handle is fluid correctly', () => {
    render(
      <Button isFluid data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByTestId('button')).toHaveClass('w-full')
  })

  it('should have right icon correctly', () => {
    render(
      <Button rightIcon={data.icon} data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
  })

  it('should have left icon correctly', () => {
    render(
      <Button leftIcon={data.icon} data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
  })

  it('should handle is loading correctly', () => {
    render(
      <Button isLoading data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByTestId('button').childNodes[0]).toHaveClass(
      'animate-spin'
    )
  })

  it('should handle size xs correctly', () => {
    render(
      <Button size='xs' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('h-7')
  })

  it('should handle size sm correctly', () => {
    render(
      <Button size='sm' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('h-8')
  })

  it('should handle size lg correctly', () => {
    render(
      <Button size='lg' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('h-11')
  })

  it('should handle size xl correctly', () => {
    render(
      <Button size='xl' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('h-[3.125rem]')
  })

  it('should handle size md correctly', () => {
    render(
      <Button size='md' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('h-9')
  })

  it('should handle variant danger correctly', () => {
    render(
      <Button variant='danger' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass('border-red-600 bg-red-500')
  })

  it('should handle variant warning correctly', () => {
    render(
      <Button variant='warning' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'border-yellow-600 bg-yellow-500'
    )
  })

  it('should handle variant success correctly', () => {
    render(
      <Button variant='success' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'border-green-600 bg-green-500'
    )
  })

  it('should handle variant info correctly', () => {
    render(
      <Button variant='info' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'border-blue-600 bg-blue-500'
    )
  })

  it('should handle size variant outline danger correctly', () => {
    render(
      <Button variant='outline-danger' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'bg-transparent text-red-600'
    )
  })

  it('should handle size variant outline warning correctly', () => {
    render(
      <Button variant='outline-warning' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'bg-transparent text-yellow-600'
    )
  })

  it('should handle size variant outline success correctly', () => {
    render(
      <Button variant='outline-success' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'bg-transparent text-green-600'
    )
  })

  it('should handle size variant outline info correctly', () => {
    render(
      <Button variant='outline-info' data-testid='button'>
        {data.message}
      </Button>
    )
    expect(screen.getByRole('button')).toHaveClass(
      'bg-transparent text-blue-600'
    )
  })
})
