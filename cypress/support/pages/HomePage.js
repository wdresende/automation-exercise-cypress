class HomePage {
  visit() {
    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
    cy.get('#slider').should('be.visible')
  }

  goToSignupLogin() {
    cy.get('a[href="/login"]').click()
  }

  goToProducts() {
    cy.get('a[href="/products"]').click()
  }

  goToCart() {
    cy.get('#header a[href="/view_cart"]').click()
  }

  logout() {
    cy.get('a[href="/logout"]').click()
  }

  deleteAccount() {
    cy.get('a[href="/delete_account"]').click()
  }

  shouldBeLoggedInAs(name) {
    cy.get('#header').contains('li', 'Logged in as').should('contain.text', name)
  }

  subscribe(email) {
    cy.get('#footer').scrollIntoView()
    cy.contains('#footer h2', 'Subscription').should('be.visible')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  shouldShowSubscriptionSuccess() {
    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!')
  }
}

export default new HomePage()
