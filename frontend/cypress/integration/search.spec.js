describe("Profile page", () => {
  it('searches for countries', () => {
    cy.login()
    cy.visit('/')
    cy.get('[title="Search for Countries"]').click()

    cy.get('[type="text"]')
      .type('Sp')
    cy.contains('Spain')
      .click()
    cy.get('[type="submit"]')
      .click()
    cy.get('img')

    // Unique svg attribute for vertical dot button
    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.get('[id="213"]')
      .click()
    // cy.contains('Spain has been added to your map.')

    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.get('[id="213"]')
      .click()
    cy.contains('Spain has been removed from your map.')
  })

  it('displays geographic info about country', () => {
    cy.login()
    cy.visit('/')
    cy.get('[title="Search for Countries"]').click()

    cy.get('[type="text"]')
      .type('Sp')
    cy.contains('Spain')
      .click()
    cy.get('[type="submit"]')
      .click()

    cy.get('[d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"]')
      .click()
    cy.contains('More Info')
      .click({force: true})

    cy.contains('Geographic & Political Info')

    cy.get('[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]')
      .click()
  })
})