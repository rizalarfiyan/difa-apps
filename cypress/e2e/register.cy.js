const { route, element, data, endpoint } = require('./constants')

/**
 * - Register spec
 *
 * - should display register page correctly
 * - should display error message when name is empty
 * - should display error message when email is empty
 * - should display error message when email is invalid
 * - should display input email correctly
 * - should display error message when password is empty
 * - should display error message when password is less than 6
 * - should display error message when password is more than 255
 * - should display error message when password confirmation is empty
 * - should display error message when password confirmation not match to password
 * - should display error message when email is already taken
 * - should display success message register page correctly
 *
 */
describe('Register spec', () => {
  beforeEach(() => {
    cy.visit(route.register)
    cy.intercept('POST', endpoint.register).as('register')
    cy.intercept('GET', endpoint.me).as('me')
  })

  it('should display register page correctly', () => {
    cy.get(element.name).should('be.visible')
    cy.get(element.email).should('be.visible')
    cy.get(element.password).should('be.visible')
    cy.get(element.passwordConfirmation).should('be.visible')
    cy.get(element.button)
      .contains(/^Register$/)
      .should('be.visible')
  })

  it('should display error message when name is empty', () => {
    cy.get(element.name).focus().blur()
    cy.get(element.name + element.error)
      .contains(/is a required field$/)
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

  it('should display error message when password is less than 6', () => {
    cy.get(element.password).type('pass').blur()
    cy.get(element.password + element.error)
      .contains(/must be at least 6 characters$/)
      .should('be.visible')
  })

  it('should display error message when password is more than 255', () => {
    const password = Cypress._.repeat('password ', 32)
    cy.get(element.password).type(password, {
      delay: 0,
    })
    cy.get(element.password + element.error)
      .contains(/must be at most 255 characters$/)
      .should('be.visible')
  })

  it('should display error message when password confirmation is empty', () => {
    cy.get(element.passwordConfirmation).focus().blur()
    cy.get(element.passwordConfirmation + element.error)
      .contains(/is a required field$/)
      .should('be.visible')
  })

  it('should display error message when password confirmation not match to password', () => {
    cy.get(element.password).type(data.password).blur()
    cy.get(element.passwordConfirmation).type('passwordd').blur()
    cy.get(element.passwordConfirmation + element.error)
      .contains(/must match$/)
      .should('be.visible')
  })

  it('should display error message when email is already taken', () => {
    cy.get(element.name).type(data.name)
    cy.get(element.email).type(data.email)
    cy.get(element.password).type(data.password)
    cy.get(element.passwordConfirmation).type(data.password)
    cy.get(element.button)
      .contains(/^Register$/)
      .click()
    cy.wait('@register').its('response.statusCode').should('eq', 400)
    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/email is already taken$/)
      .should('be.visible')
  })

  it('should display success message register page correctly', () => {
    cy.get(element.name).type(data.name)
    cy.get(element.email).type(data.uniqEmail)
    cy.get(element.password).type(data.password)
    cy.get(element.passwordConfirmation).type(data.password)
    cy.get(element.button)
      .contains(/^Register$/)
      .click()
    cy.wait('@register').its('response.statusCode').should('eq', 201)
    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Success Register$/)
      .should('be.visible')
  })
})
