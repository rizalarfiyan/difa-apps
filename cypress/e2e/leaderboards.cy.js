const { route, page, endpoint } = require('./constant')

/**
 * - Login spec
 *
 * - should display leaderboards page correctly
 *
 */
describe('Leaderboards spec', () => {
  beforeEach(() => {
    cy.visit(route.leaderboards)
    cy.intercept('GET', endpoint.leaderboards).as('leaderboards')
  })

  it('should display leaderboards page correctly', () => {
    cy.get('main h1')
      .contains(/Leaderboards of active users$/)
      .should('be.visible')
    cy.get('#leaderboards').should('be.visible')
    cy.get('#leaderboards > [role="status"]').should(
      'have.length',
      page.leaderboards
    )
    cy.wait('@leaderboards').its('response.statusCode').should('eq', 200)
    cy.get(
      '#leaderboards > div:not([role="status"]):not([role="alert"])'
    ).should('have.length', page.leaderboards)
  })
})
