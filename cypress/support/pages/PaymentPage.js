class PaymentPage {
  pay(card) {
    cy.get('[data-qa="name-on-card"]').type(card.nameOnCard)
    cy.get('[data-qa="card-number"]').type(card.number, { log: false })
    cy.get('[data-qa="cvc"]').type(card.cvc, { log: false })
    cy.get('[data-qa="expiry-month"]').type(card.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(card.expiryYear)
    cy.get('[data-qa="pay-button"]').click()
  }

  shouldShowOrderPlaced() {
    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
  }
}

export default new PaymentPage()
