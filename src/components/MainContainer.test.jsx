import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MainContainer from './MainContainer'

const data = {
  children: 'This is children',
  className: 'test-class',
}

/*
 * test scenarios for MainContainer component
 *
 * - should handle children correctly
 * - should handle is center correctly
 * - should handle className correctly
 *
 */
describe('MainContainer component', () => {
  it('should handle children correctly', () => {
    render(
      <MainContainer data-testid='main-container'>
        {data.children}
      </MainContainer>
    )
    expect(screen.getByTestId('main-container')).toHaveTextContent(
      data.children
    )
  })

  it('should handle is center correctly', () => {
    render(
      <MainContainer isCenter data-testid='main-container'>
        {data.children}
      </MainContainer>
    )
    expect(screen.getByTestId('main-container')).toHaveClass('justify-center')
  })

  it('should handle className correctly', () => {
    render(
      <MainContainer className={data.className} data-testid='main-container'>
        {data.children}
      </MainContainer>
    )
    expect(screen.getByTestId('main-container')).toHaveClass(data.className)
  })
})
