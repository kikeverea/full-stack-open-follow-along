describe('Note app', function() {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Kike',
      username: 'kike',
      password: 'asd'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  it('can login', function() {
    const username = cy.get('#username')
    const password = cy.get('#password')
    const loginButton = cy.get('#login-button')

    username.type('kike')
    password.type('asd')
    loginButton.click()

    cy.contains('kike is logged-in')
  })
})