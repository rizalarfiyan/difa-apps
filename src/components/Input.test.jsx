import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Input from './Input'

const data = {
  title: 'This is title',
  as: 'input',
  limit: 50,
  value: 'This is value',
  error: 'This is error',
}

describe('Input component', () => {
  it('should show correctly', () => {
    render(
      <Input
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )
    expect(screen.getByTestId('input-wrapper')).toBeInTheDocument()
  })

  it('should handle title correctly', () => {
    render(
      <Input
        title={data.title}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelector('label')
    ).toHaveTextContent(data.title)
  })

  it('should handle element as input correctly', () => {
    render(
      <Input
        title={data.title}
        name='input-test'
        id='input-test'
        as={data.as}
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelector(data.as)
    ).toBeInTheDocument()
  })

  it('should handle element as textarea correctly', () => {
    render(
      <Input
        title={data.title}
        name='input-test'
        id='input-test'
        as='textarea'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelector('textarea')
    ).toBeInTheDocument()
  })

  it('should handle limit correctly', () => {
    render(
      <Input
        title={data.title}
        limit={data.limit}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelectorAll('p')[1] || null
    ).toHaveTextContent(data.limit)
  })

  it('should handle empty limit correctly', () => {
    render(
      <Input
        title={data.title}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelectorAll('p')[1] || null
    ).not.toBeInTheDocument()
  })

  it('should handle value correctly', () => {
    render(
      <Input
        title={data.title}
        as={data.as}
        value={data.value}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelector(data.as)
    ).toHaveAttribute('value', data.value)
  })

  it('should handle error correctly', () => {
    render(
      <Input
        title={data.title}
        error={data.error}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelectorAll('p')[0] || null
    ).toHaveTextContent(data.error)
  })

  it('should handle empty error correctly', () => {
    render(
      <Input
        title={data.title}
        name='input-test'
        id='input-test'
        wrapper={{ 'data-testid': 'input-wrapper' }}
      />
    )

    expect(
      screen.getByTestId('input-wrapper').querySelectorAll('p')[0] || null
    ).toHaveTextContent('')
  })
})
