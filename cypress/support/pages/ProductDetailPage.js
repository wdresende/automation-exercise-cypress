class ProductDetailPage {
  shouldShowProductDetails() {
    cy.url().should('include', '/product_details/')
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty')
      cy.contains('p', 'Category:').should('be.visible')
      cy.contains('span', 'Rs.').should('be.visible')
      cy.contains('p', 'Availability:').should('be.visible')
      cy.contains('p', 'Condition:').should('be.visible')
      cy.contains('p', 'Brand:').should('be.visible')
    })
  }
}

export default new ProductDetailPage()
