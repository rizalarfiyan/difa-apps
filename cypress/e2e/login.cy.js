const { route, element, data, endpoint } = require('./constant')

/**
 * - Login spec
 *
 * - should display login page correctly
 * - should display error message when email is empty
 * - should display error message when email is invalid
 * - should display input email correctly
 * - should display error message when password is empty
 * - should display error message when password is less than 5
 * - should display error message when password is more than 255
 * - should display error message when username and password are wrong
 * - should display success message login page correctly
 * - should display success message logout page correctly
 *
 */
describe('template spec', () => {
  beforeEach(() => {
    cy.visit(route.login)
    cy.intercept('POST', endpoint.login).as('login')
    cy.intercept('GET', endpoint.me).as('me')
    cy.intercept('GET', endpoint.threads).as('threads')
    cy.intercept('GET', endpoint.users).as('users')
  })

  it('should display login page correctly', () => {
    cy.get(element.email).should('be.visible')
    cy.get(element.password).should('be.visible')
    cy.get(element.button)
      .contains(/^Login$/)
      .should('be.visible')
  })

  it('should display error message when email is empty', () => {
    cy.get(element.email).focus().blur()
    cy.get(element.email + element.error)
      .contains(/is a required field$/)
      .should('be.visible')
  })

  it('should display error message when email is invalid', () => {
    cy.get(element.email).type('invalidemail').blur()
    cy.get(element.email + element.error)
      .contains(/must be a valid email$/)
      .should('be.visible')
  })

  it('should display input email correctly', () => {
    cy.get(element.email).type(data.email).blur()
    cy.get(element.email + element.error).should('not.be.visible')
  })

  it('should display error message when password is empty', () => {
    cy.get(element.password).focus().blur()
    cy.get(element.password + element.error)
      .contains(/is a required field$/)
      .should('be.visible')
  })

  it('should display error message when password is less than 5', () => {
    cy.get(element.password).type('pass').blur()
    cy.get(element.password + element.error)
      .contains(/must be at least 5 characters$/)
      .should('be.visible')
  })

  it('should display error message when password is more than 255', () => {
    cy.get(element.password).invoke('text', 'password'.repeat(32)).type('!')
    cy.get(element.password + element.error)
      .contains(/must be at least 5 characters$/)
      .should('be.visible')
  })

  it('should display error message when username and password are wrong', () => {
    cy.get(element.email).type('admin@gmail.com')
    cy.get(element.password).type('passwd')
    cy.get(element.button)
      .contains(/^Login$/)
      .click()
    cy.wait('@login').its('response.statusCode').should('eq', 401)
    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/email or password is wrong$/)
      .should('be.visible')
  })

  it('should display success message login page correctly', () => {
    cy.get(element.email).type(data.email)
    cy.get(element.password).type(data.password)
    cy.get(element.button)
      .contains(/^Login$/)
      .click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Success Login!$/)
      .should('be.visible')
  })

  it('should display success message logout page correctly', () => {
    cy.get(element.email).type(data.email)
    cy.get(element.password).type(data.password)
    cy.get(element.button)
      .contains(/^Login$/)
      .click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
    cy.wait('@me').its('response.statusCode').should('eq', 200)
    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Success Login!$/)
      .should('be.visible')

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)
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
  })
})
