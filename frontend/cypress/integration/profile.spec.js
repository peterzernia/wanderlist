describe("Profile page", () => {
  it('redirects to login when not authenticated', () => {
    cy.visit('/edit_profile')
    cy.url().should('include', '/login')
  })

  it('view page when authenticated', () => {
    cy.login()
    cy.visit('/')
    cy.get('[title="My Profile"]').click()
  })

  it('edits profile', () => {
    cy.login()
    cy.visit('/')
    cy.get('[title="My Profile"]').click()

    cy.contains('Edit Profile').click()
    cy.get('[name="biography"]')
      .clear()
      .type('Test Biography')
    cy.get('[name="email"]')
      .clear()
      .type('test2@test.com')
    cy.get('input[name="country"]').then(el => el.val(Math.random() * 250))
    cy.get('[type="submit"]')
      .click()

    cy.contains('Test Biography')
  })

  it('creates a trip report and edits it', () => {
    cy.login()
    cy.visit('/')
    cy.get('[title="My Profile"]').click()

    cy.get('[title="New Trip Report"]')
      .click()
    cy.get('input[name="countries"]').then(el => el.val(3))
    cy.get('[name="title"]')
      .type('Test Trip Report')
    cy.get('[name="content"]')
      .type('This is a test')
    cy.get('[type="submit"]')
      .click()
    
    cy.contains('Test Trip Report')

    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z]')
      .click()
  })
})