const { route, skeleton, endpoint } = require('./constants')

/**
 * - Login spec
 *
 * - should display skeleton leaderboards page correctly
 * - should display leaderboards page correctly
 * - should display not found of leaderboards page correctly
 *
 */
describe('Leaderboards spec', () => {
  beforeEach(() => {
    cy.visit(route.leaderboards)
    cy.intercept('GET', endpoint.leaderboards).as('leaderboards')
  })

  it('should display skeleton leaderboards page correctly', () => {
    cy.get('main h1')
      .contains(/Leaderboards of active users$/)
      .should('be.visible')
    cy.get('#leaderboards').should('be.visible')
    cy.get('#leaderboards > [role="status"]').should(
      'have.length',
      skeleton.leaderboards
    )
  })

  it('should display leaderboards page correctly', () => {
    cy.get('main h1')
      .contains(/Leaderboards of active users$/)
      .should('be.visible')
    cy.get('#leaderboards').should('be.visible')
    cy.get('#leaderboards > [role="status"]').should(
      'have.length',
      skeleton.leaderboards
    )
    cy.wait('@leaderboards').its('response.statusCode').should('eq', 200)
    cy.get(
      '#leaderboards > div:not([role="status"]):not([role="alert"])'
    ).should('have.length', skeleton.leaderboards)
  })
})
