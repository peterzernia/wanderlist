describe('Navigating with the navbar', () => {
  it('Navigates to feed page', () => {
    cy.visit('/')
    cy.get('[title="Trip Report Feed"]').click()
    cy.url().should('include', '/feed')
  })

  it('Navigates to search page', () => {
    cy.get('[title="Search for Countries"]').click()
    cy.url().should('include', '/search')
  })

  it('Navigates to profile page', () => {
    cy.get('[title="My Profile"]').click()
    cy.url().should('include', '/login') // Originally not authenticated
    cy.login()
    cy.visit('/')
    cy.get('[title="My Profile"]').click()
    cy.url().should('include', '/edit_profile')
  })
})