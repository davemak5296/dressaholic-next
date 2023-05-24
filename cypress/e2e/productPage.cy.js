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

    cy.wait(4000);
    cy.get('.daisy-dropdown-content li>a[href="/shop/women"]').click({force: true})
    cy.get('a[href="/shop/women-tops"]').click()

    cy.wait(4000)
    cy.get('button[aria-label="click to enter detailed page of Onus Cozy Top"]').click()

    cy.wait(3000)
  })
  
  it('add 3 qty to the cart, one at a time', () => {
    cy.get('button').contains('Add to cart').as('add').click()
    cy.wait(1000)
    cy.get('@add').click()
    cy.wait(1000)
    cy.get('@add').click()

    cy.wait(8000)
    cy.get('.dropdown-container section strong').should('have.text', 3)
  })

  it('auto change input to stock if user entered a number larger than stock', () => {
    cy.get('p span:nth-child(2)').then( ele => {
      const stockleft = ele.text().trim()

      cy.get('input')
        .type('{backspace}')
        .type('5')
        .should('have.value', stockleft)
      cy.get('button').contains('Add to cart').as('add').click()

      cy.wait(2000)
      cy.get('.dropdown-container section strong').should('have.text', stockleft)
    })
    
  })

  it('change size, then add to cart', () => {
    cy.get('li').contains('md').click();
    cy.get('button').contains('Add to cart').as('add').click()
    cy.get('@add').click()

    cy.wait(2000)
    cy.get('.dropdown-container section div p:nth-child(2)').should('include.text', 'md')
  })

})