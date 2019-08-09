Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/rest-auth/login/',
      body: {
        username: 'TestUser',
        password: 'testing1234',
      }
    }).then(res => {
      window.localStorage.setItem('token', res.body.key)
    })
})