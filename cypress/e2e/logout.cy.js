const { route, element, endpoint } = require('./constants')
const { login } = require('./helpers')

/**
 * - Login spec
 *
 * - should display login page correctly
 * - should display error message when email is empty
 * - should display error message when email is invalid
 * - should display input email correctly
 * - should display error message when password is empty
 * - should display error message when password is less than 6
 * - should display error message when password is more than 255
 * - should display error message when username and password are wrong
 * - should display success message login page correctly
 * - should display success message logout page correctly
 *
 */
describe('Logout spec', () => {
  beforeEach(() => {
    login()
    cy.visit(route.leaderboards)
    cy.intercept('GET', endpoint.leaderboards).as('leaderboards')
  })

  it('should display dropdown logout page correctly', () => {
    cy.wait('@leaderboards').its('response.statusCode').should('eq', 200)
    cy.get(element.dropdown).find('div[aria-hidden="true"]').click()
    cy.get(element.dropdown)
      .find('button')
      .contains(/^Logout$/)
      .should('be.visible')
  })

  it('should display success message logout page correctly', () => {
    cy.wait('@leaderboards').its('response.statusCode').should('eq', 200)
    cy.get(element.dropdown).find('div[aria-hidden="true"]').click()
    cy.get(element.dropdown)
      .find('button')
      .contains(/^Logout$/)
      .should('be.visible')
      .click()

    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Success Logout!$/)
      .should('be.visible')
    cy.get('header a[href="/login"]')
      .contains(/^Login$/)
      .should('be.visible')
  })
})
