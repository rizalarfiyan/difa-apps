const { route, skeleton, element, endpoint } = require('./constants')

/**
 * - Threads spec
 *
 * - should display skeleton threads content page correctly
 * - should display skeleton threads category page correctly
 * - should display threads page correctly
 * - should display threads count of content same as count of category + 1 correctly
 * - should display threads content same as category + 1 correctly
 * - should display info message when user click up vote but not login
 * - should display info message when user click down vote but not login
 *
 */
describe('Threads spec', () => {
  beforeEach(() => {
    cy.visit(route.threads)
    cy.intercept('GET', endpoint.threads).as('threads')
    cy.intercept('GET', endpoint.users).as('users')
  })

  it('should display skeleton threads content page correctly', () => {
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#threads').should('be.visible')
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)
  })

  it('should display skeleton threads category page correctly', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')

    cy.get('#category').should('be.visible')
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
  })

  it('should display threads page correctly', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)
  })

  it('should display threads count of content same as count of category + 1 correctly', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"])').then(
      (value) => {
        const contentLength = Cypress.$(value).length
        expect(value).to.have.length(contentLength)

        cy.get('#category > div:not([role="status"])').should(
          'have.length',
          contentLength + 1
        )
      }
    )
  })

  it('should display threads content same as category + 1 correctly', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    const threadCategories = {
      all: 0,
    }
    cy.get('#threads > div:not([role="status"]):not([role="alert"])').each(
      (value) => {
        const text = value.find('.category').text().toLowerCase()
        threadCategories.all += 1
        if (!threadCategories?.[text]) {
          threadCategories[text] = 1
        } else {
          threadCategories[text] += 1
        }
      }
    )

    const categories = {}
    cy.get('#category > div:not([role="status"])').each((value) => {
      const name = value.find('h3').text().toLowerCase()
      const count = parseInt(value.find('h3 ~ div').text() || 0, 10)
      categories[name] = count
    })

    cy.wait(1).should(() => {
      expect(threadCategories).to.deep.eq(categories)
    })
  })

  it('should display info message when user click up vote but not login', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"])')
      .eq(0)
      .find('button')
      .eq(0)
      .click()

    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Please login first!$/)
      .should('be.visible')
  })

  it('should display info message when user click down vote but not login', () => {
    cy.get('main h1')
      .eq(0)
      .contains(/Category$/)
      .should('be.visible')
    cy.get('main h1')
      .eq(1)
      .contains(/Available Threads$/)
      .should('be.visible')

    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"])')
      .eq(0)
      .find('button')
      .eq(1)
      .click()

    cy.get(element.notification)
      .eq(0)
      .find('p')
      .contains(/Please login first!$/)
      .should('be.visible')
  })
})
