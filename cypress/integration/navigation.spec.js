/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('is homepage', () => {
    cy.get('h1').should('contain', 'Home')
    cy.location('pathname').should('equal', '/')
  })

  it('opens home page', () => {
    cy.get('body > header > nav > a').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
    cy.get('h1').should('contain', 'Home')
  })

  it('opens about page', () => {
    cy.get('body > header > nav > a').contains('About').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/about.html')
    cy.get('h1').should('contain', 'About')
  })

  it('opens contacts page', () => {
    cy.get('body > header > nav > a').contains('Contacts').click()
    cy.location('pathname', { timeout: 10000 }).should('equal', '/contacts.html')
    cy.get('h1').should('contain', 'Contacts')
  })

  it('navigation: home > about > home', () => {
    cy.get('body > header > nav > a').contains('About').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/about.html')
    cy.get('body > header > nav > a').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
  })

  it('navigation: home > about > contacts', () => {
    cy.get('body > header > nav > a').contains('About').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/about.html')
    cy.get('body > header > nav > a').contains('Contacts').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/contacts.html')
  })

  it('navigation: home > contacts > home', () => {
    cy.get('body > header > nav > a').contains('Contacts').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/contacts.html')
    cy.get('body > header > nav > a').contains('Home').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/index.html')
  })

  it('navigation: home > contacts > about', () => {
    cy.get('body > header > nav > a').contains('Contacts').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/contacts.html')
    cy.get('body > header > nav > a').contains('About').click()
    cy.location('pathname', { timeout: 10000 }).should('contain', '/about.html')
  })
})
