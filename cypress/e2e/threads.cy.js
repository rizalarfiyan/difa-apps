const { route, skeleton, element, endpoint } = require('./constants')
const { login } = require('./helpers')

/**
 * - Threads spec
 *
 * - should display skeleton threads content page correctly
 * - should display skeleton threads category page correctly
 * - should display threads page correctly
 * - should display threads count of content same as count of category + 1 correctly
 * - should display threads content same as category + 1 correctly
 * - should display threads content same as category correctly if user filter the category
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

  it('should display threads content same as category correctly if user filter the category', () => {
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#category > div:not([role="status"])').each((value) => {
      cy.get(value).click()
      const count = parseInt(value.find('h3 ~ div').text() || 0, 10)
      cy.get('#threads > div:not([role="status"]):not([role="alert"])')
        .find('.category')
        .should('length', count)
    })
  })

  it('should display info message when user click up vote but not login', () => {
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

/**
 * - Threads with login spec
 *
 * - should display count up when user click up vote
 * - should display count down when user click down vote
 * - should display netral count up netral when user click active up vote
 * - should display netral count down netral when user click active down vote
 *
 */
describe('Threads with login spec', () => {
  beforeEach(() => {
    login()
    cy.visit(route.threads)
    cy.intercept('GET', endpoint.threads).as('threads')
    cy.intercept('GET', endpoint.users).as('users')
    cy.intercept('POST', endpoint.threadsUp).as('threads-up')
    cy.intercept('POST', endpoint.threadsDown).as('threads-down')
    cy.intercept('POST', endpoint.threadsNeutral).as('threads-neutral')
  })

  it('should display count up when user click up vote', () => {
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then(async (elem) => {
        // back to neutral
        if (elem.hasClass('!bg-blue-50 dark:!bg-opacity-10')) {
          cy.get(elem).click()
          cy.get(elem).find('.animate-spin').should('be.visible')
          cy.wait('@threads-neutral')
            .its('response.statusCode')
            .should('eq', 201)
        }
      })

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('before-count-up')
      })

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .click()
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .find('.animate-spin')
      .should('be.visible')
    cy.wait('@threads-up').its('response.statusCode').should('eq', 201)

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('after-count-up')
      })

    cy.get('@after-count-up').then((afterCount) => {
      cy.get('@before-count-up').then((beforeCount) => {
        cy.log('get-data: ')
        expect(afterCount).to.eq(beforeCount + 1)
      })
    })
  })

  it('should display count down when user click down vote', () => {
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then(async (elem) => {
        // back to neutral
        if (elem.hasClass('!bg-blue-50 dark:!bg-opacity-10')) {
          cy.get(elem).click()
          cy.get(elem).find('.animate-spin').should('be.visible')
          cy.wait('@threads-neutral')
            .its('response.statusCode')
            .should('eq', 201)
        }
      })

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('before-count-down')
      })

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .click()
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .find('.animate-spin')
      .should('be.visible')
    cy.wait('@threads-down').its('response.statusCode').should('eq', 201)

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('after-count-down')
      })

    cy.get('@after-count-down').then((afterCount) => {
      cy.get('@before-count-down').then((beforeCount) => {
        cy.log('get-data: ')
        expect(afterCount).to.eq(beforeCount + 1)
      })
    })
  })

  it('should display netral count up netral when user click active up vote', () => {
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then(async (elem) => {
        // back to count up
        if (!elem.hasClass('!bg-blue-50 dark:!bg-opacity-10')) {
          cy.get(elem).click()
          cy.get(elem).find('.animate-spin').should('be.visible')
          cy.wait('@threads-up').its('response.statusCode').should('eq', 201)
        }
      })

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('before-neutral')
      })

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .click()
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .find('.animate-spin')
      .should('be.visible')
    cy.wait('@threads-neutral').its('response.statusCode').should('eq', 201)

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(0)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('after-neutral')
      })

    cy.get('@after-neutral').then((afterCount) => {
      cy.get('@before-neutral').then((beforeCount) => {
        cy.log('get-data: ')
        expect(afterCount).to.eq(beforeCount - 1)
      })
    })
  })

  it('should display netral count down netral when user click active down vote', () => {
    cy.get('#category > [role="status"]').should(
      'have.length',
      skeleton.category
    )
    cy.get('#threads > [role="status"]').should('have.length', skeleton.threads)

    cy.wait('@threads').its('response.statusCode').should('eq', 200)
    cy.wait('@users').its('response.statusCode').should('eq', 200)

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then(async (elem) => {
        // back to count down
        if (!elem.hasClass('!bg-blue-50 dark:!bg-opacity-10')) {
          cy.get(elem).click()
          cy.get(elem).find('.animate-spin').should('be.visible')
          cy.wait('@threads-down').its('response.statusCode').should('eq', 201)
        }
      })

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('before-neutral')
      })

    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .click()
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .find('.animate-spin')
      .should('be.visible')
    cy.wait('@threads-neutral').its('response.statusCode').should('eq', 201)

    cy.wait(100)
    cy.get('#threads > div:not([role="status"]):not([role="alert"]) button')
      .eq(1)
      .then((elem) => {
        cy.wrap(parseInt(elem.text(), 10)).as('after-neutral')
      })

    cy.get('@after-neutral').then((afterCount) => {
      cy.get('@before-neutral').then((beforeCount) => {
        cy.log('get-data: ')
        expect(afterCount).to.eq(beforeCount - 1)
      })
    })
  })
})
