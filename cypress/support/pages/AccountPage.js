class AccountPage {
  shouldShowAccountCreated() {
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('have.text', 'Account Created!')
  }

  shouldShowAccountDeleted() {
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('have.text', 'Account Deleted!')
  }

  continue() {
    cy.get('[data-qa="continue-button"]').click()
  }
}

export default new AccountPage()
