import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CardInput from './CardInput'

const data = {
  title: 'This is title',
  content: 'This is content',
}

/*
 * test scenarios for CardInput component
 *
 * - should handle title correctly
 * - should handle children correctly
 *
 */
describe('CardInput component', () => {
  it('should handle title correctly', () => {
    render(
      <CardInput data-testid='cardinput' title={data.title}>
        {data.content}
      </CardInput>
    )
    expect(screen.getByTestId('cardinput')).toHaveTextContent(data.title)
  })

  it('should handle children correctly', () => {
    render(
      <CardInput data-testid='cardinput' title={data.title}>
        {data.content}
      </CardInput>
    )
    expect(screen.getByTestId('cardinput')).toHaveTextContent(data.content)
  })
})
