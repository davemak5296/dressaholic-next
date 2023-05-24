/// <reference types="cypress" />

describe('', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/auth')

    cy.get('input[aria-label="enter your email"]')
      .type('zzz@gmail.com')
    cy.get('input[aria-label="enter your password"]')
      .type('12341234')
    cy.get('button').contains('sign in').click()

    cy.wait(4000)
    cy.get('div.cart-icon').click({force: true})

    cy.wait(2000)
    cy.get('button').contains('GO TO CHECKOUT').click()


    cy.wait(3000)
  })
  it('add, substract and delete item', () => {
    // add 4 qty
    cy.get('img:visible[alt="plus-sign"]').as('add').click()
    cy.wait(1500)
    cy.get('@add').click()
    cy.wait(1500)
    cy.get('@add').click()
    cy.wait(1500)
    cy.get('@add').click()

    cy.wait(2000)
    cy.get('@add').prev().as('qty').then( ele => {
      const text = ele.text().trim();
      expect(Number(text)).to.equal(5)
    })

    // subtract 2 qty
    cy.get('img:visible[alt="minus-sign"]').as('minus').click()
    cy.wait(1500)
    cy.get('@minus').click()
    cy.wait(1500)
    cy.get('@minus').click()
    
    cy.wait(2000)
    cy.get('@qty').then( ele => {
      const text = ele.text().trim();
      expect(Number(text)).to.equal(2)
    })

    // delete the product
    cy.get('img:visible[alt="delete-sign"]').as('del').click()
    cy.get('div').contains('Your cart is empty, let\'s go shopping!').should('exist')
  })
})