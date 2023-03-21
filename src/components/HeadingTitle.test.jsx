import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HeadingTitle from './HeadingTitle'

const data = {
  title: 'This is title',
}

describe('HeadingTitle component', () => {
  it('should handle title correctly', () => {
    render(<HeadingTitle data-testid='headingTitle' title={data.title} />)
    expect(screen.getByTestId('headingTitle')).toHaveTextContent(data.title)
  })
})
