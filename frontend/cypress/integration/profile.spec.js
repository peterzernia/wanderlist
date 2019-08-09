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

    // Edit Trip Report
    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.get('[d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"]')
      .click()

    cy.get('input[name="countries"]').then(el => el.val(4))
    cy.get('[name="title"]')
      .clear()
      .type('Test Trip Report Updated')
    cy.get('[name="content"]')
      .clear()
      .type('This is a test updated')
    cy.get('[type="submit"]')
      .click()

    cy.contains('Your post has been updated.')
    cy.contains('Test Trip Report Updated')
    cy.get('[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]')
      .click()

    // View Trip Report
    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.get('[d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"]')
      .click()
    
    cy.contains('Test Trip Report Updated')
    cy.contains('TestUser')
    cy.contains('This is a test updated')
    cy.contains('Albania')
    cy.get('[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]')
      .click()

    // Delete Trip Report
    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.get('[d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"]')
      .click()
    cy.contains('Delete')
      .click()
    cy.contains('Your post has been deleted.')
  })
})