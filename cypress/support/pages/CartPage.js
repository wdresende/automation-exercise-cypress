class CartPage {
  shouldBeVisible() {
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
  }

  shouldContainProducts(count) {
    cy.get('#cart_info_table tbody tr').should('have.length', count)
  }

  proceedToCheckout() {
    cy.contains('.check_out', 'Proceed To Checkout').click()
  }

  goToLoginFromCheckoutModal() {
    cy.get('#checkoutModal a[href="/login"]').click()
  }
}

export default new CartPage()
