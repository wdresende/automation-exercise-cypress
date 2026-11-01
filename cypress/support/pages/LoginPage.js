class LoginPage {
  shouldBeVisible() {
    cy.url().should('include', '/login')
    cy.contains('.login-form h2', 'Login to your account').should('be.visible')
    cy.contains('.signup-form h2', 'New User Signup!').should('be.visible')
  }

  login(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
    cy.get('[data-qa="login-button"]').click()
  }

  startSignup(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
  }

  shouldShowLoginError() {
    cy.get('.login-form p')
      .should('be.visible')
      .and('have.text', 'Your email or password is incorrect!')
  }

  shouldShowEmailAlreadyExists() {
    cy.get('.signup-form p')
      .should('be.visible')
      .and('have.text', 'Email Address already exist!')
  }
}

export default new LoginPage()
