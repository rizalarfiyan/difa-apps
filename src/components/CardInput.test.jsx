import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CardInput from './CardInput'

const data = {
  title: 'This is title',
  content: 'This is content',
}

describe('CardInput component', () => {
  it('should handle title correctly', async () => {
    render(
      <CardInput data-testid='cardinput' title={data.title}>
        {data.content}
      </CardInput>
    )
    expect(screen.getByTestId('cardinput')).toHaveTextContent(data.title)
  })

  it('should handle children correctly', async () => {
    render(
      <CardInput data-testid='cardinput' title={data.title}>
        {data.content}
      </CardInput>
    )
    expect(screen.getByTestId('cardinput')).toHaveTextContent(data.content)
  })
})
