const { endpoint, route, element, data } = require('./constants')

const login = () => {
  cy.intercept('POST', endpoint.login).as('login')
  cy.intercept('GET', endpoint.me).as('me')
  cy.session(data.email, () => {
    cy.visit(route.login)
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
  })
}

module.exports = {
  login,
}
