describe("Profile page", () => {
  it('redirects to login when not authenticated', () => {
    cy.visit('/edit_profile')
    cy.url().should('include', '/login')
  })
})