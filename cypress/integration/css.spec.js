/// <reference types="cypress" />

context('CSS', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('homepage colours', () => {
    cy.get('body')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  })
})
