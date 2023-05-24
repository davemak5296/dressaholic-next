/// <reference types="cypress" />

describe('', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/auth')
  })
  it('set cookie when logged in and clear cookie when logged out', () => {
    // login
    cy.get('input[aria-label="enter your email"]')
      .type('dave@gmail.com').should('have.value', 'dave@gmail.com')
    cy.get('input[aria-label="enter your password"]')
      .type('12341234').should('have.value', '12341234')
    cy.get('button').contains('sign in').click()

    cy.wait(4000);
    cy.getCookie('user').should('have.property', 'value').and('be.a', 'string')

    // login out
    cy.get('button').contains('sign out').click()
    cy.wait(2000)
    cy.getCookie('user').should('be.null')
  })

  it('sign up with existing accounts trigger an alert', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('div input[aria-label="enter your preferred display name"]')
      .type('zzz').should('have.value', 'zzz')
    cy.get('div input[aria-label="enter your email address"]')
      .type('zzz@gmail.com').should('have.value', 'zzz@gmail.com')
    cy.get('div input[aria-label="enter your preferred password"]')
      .type('12341234').should('have.value', '12341234')
    cy.get('div input[aria-label="enter your preferred password again"]')
      .type('12341234').should('have.value', '12341234')

    cy.get('button').contains('sign up').click()
    cy.wait(2000)
    cy.then( () => {
      expect(stub.getCall(0)).to.be.calledWithMatch('already in use');
    })
  })

  it('sign up successfully, then login and set cookie', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('div input[aria-label="enter your preferred display name"]')
      .type('hhh').should('have.value', 'hhh')
    cy.get('div input[aria-label="enter your email address"]')
    // please use another email address to test
      .type('hhh@gmail.com').should('have.value', 'hhh@gmail.com')
    cy.get('div input[aria-label="enter your preferred password"]')
      .type('12341234').should('have.value', '12341234')
    cy.get('div input[aria-label="enter your preferred password again"]')
      .type('12341234').should('have.value', '12341234')

    cy.get('button').contains('sign up').click()
    cy.wait(4000)
    cy.then( () => {
      expect(stub.getCall(0)).to.be.calledWithMatch('successfully');
    })
    
    cy.wait(4000)
    cy.getCookie('user').should('have.property', 'value').and('be.a', 'string')
  })

  it('go to men\'s category page', () => {
    cy.get('.daisy-dropdown-content li>a[href="/shop/men"]').click({force: true})
    cy.then( () => {
      cy.url().should('include', '/shop/men')
    })
  })

  it('go to women\'s category page', () => {
    cy.get('.daisy-dropdown-content li>a[href="/shop/women"]').click({force: true})
    cy.then( () => {
      cy.url().should('include', '/shop/women')
    })
  })

  // it('', () => {})
})