class CheckoutPage {
  shouldShowAddressDetails(user) {
    cy.contains('h2', 'Address Details').should('be.visible')
    cy.get('#address_delivery').within(() => {
      cy.get('.address_firstname').should('contain.text', `${user.firstName} ${user.lastName}`)
      cy.get('.address_address1').should('contain.text', user.address1)
      cy.get('.address_city').should('contain.text', user.city)
      cy.get('.address_country_name').should('have.text', user.country)
      cy.get('.address_phone').should('have.text', user.mobileNumber)
    })
  }

  shouldShowReviewOrder(productCount) {
    cy.contains('h2', 'Review Your Order').should('be.visible')
    cy.get('#cart_info tbody tr[id^="product-"]').should('have.length', productCount)
  }

  placeOrder(comment) {
    cy.get('textarea[name="message"]').type(comment)
    cy.get('a[href="/payment"]').click()
  }
}

export default new CheckoutPage()
