class ProductsPage {
  shouldBeVisible() {
    cy.url().should('include', '/products')
    cy.contains('.features_items h2.title', 'All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
  }

  viewFirstProduct() {
    cy.get('.features_items .product-image-wrapper')
      .first()
      .find('a[href^="/product_details/"]')
      .click()
  }

  search(term) {
    cy.get('#search_product').type(term)
    cy.get('#submit_search').click()
  }

  shouldShowSearchResults(term) {
    cy.contains('.features_items h2.title', 'Searched Products').should('be.visible')
    cy.get('.features_items .productinfo p')
      .should('have.length.greaterThan', 0)
      .each(($name) => {
        expect($name.text().toLowerCase()).to.include(term.toLowerCase())
      })
  }

  addProductToCart(productId) {
    cy.get(`.productinfo a[data-product-id="${productId}"]`).click()
    cy.get('#cartModal').should('be.visible')
  }

  continueShopping() {
    cy.get('#cartModal button.close-modal').click()
    cy.get('#cartModal').should('not.be.visible')
  }

  viewCartFromModal() {
    cy.get('#cartModal a[href="/view_cart"]').click()
  }
}

export default new ProductsPage()
