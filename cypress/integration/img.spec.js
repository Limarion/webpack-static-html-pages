/// <reference types="cypress" />

context('Images', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/about.html')
  })

  it('is about page', () => {
    cy.get('h1').should('contain', 'About')
  })
})
