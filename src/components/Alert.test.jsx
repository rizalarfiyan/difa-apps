import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from './Alert'

const data = {
  message: 'ini adalah alert',
}
describe('Alert component', () => {
  it('should handle message correctly', async () => {
    render(<Alert message={data.message} />)
    const alert = await screen.getByRole('alert')
    expect(alert.textContent).toBe(data.message)
  })

  it('should handle children correctly', async () => {
    render(<Alert>{data.message}</Alert>)
    const alert = await screen.getByRole('alert')
    expect(alert.textContent).toBe(data.message)
  })

  it('should handle variant danger correctly', async () => {
    render(<Alert variant='danger' message={data.message} />)
    const alert = await screen.getByRole('alert')
    expect(alert.className).toContain('bg-red-100 text-red-700')
  })

  it('should handle variant warning', async () => {
    render(<Alert variant='warning' message={data.message} />)
    const alert = await screen.getByRole('alert')
    expect(alert.className).toContain('bg-yellow-100 text-yellow-700')
  })

  it('should handle variant success', async () => {
    render(<Alert variant='success' message={data.message} />)
    const alert = await screen.getByRole('alert')
    expect(alert.className).toContain('bg-green-100 text-green-700')
  })

  it('should handle variant info correctly', async () => {
    render(<Alert variant='info' message={data.message} />)
    const alert = await screen.getByRole('alert')
    expect(alert.className).toContain('bg-blue-100 text-blue-700')
  })
})
