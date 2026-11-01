class SignupPage {
  fillAccountInformation(user) {
    cy.contains('h2', 'Enter Account Information').should('be.visible')
    cy.get(`#id_gender${user.title === 'Mr' ? 1 : 2}`).check()
    cy.get('[data-qa="password"]').type(user.password, { log: false })
    cy.get('[data-qa="days"]').select(user.birthDay)
    cy.get('[data-qa="months"]').select(user.birthMonth)
    cy.get('[data-qa="years"]').select(user.birthYear)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  fillAddressInformation(user) {
    cy.get('[data-qa="first_name"]').type(user.firstName)
    cy.get('[data-qa="last_name"]').type(user.lastName)
    cy.get('[data-qa="company"]').type(user.company)
    cy.get('[data-qa="address"]').type(user.address1)
    cy.get('[data-qa="address2"]').type(user.address2)
    cy.get('[data-qa="country"]').select(user.country)
    cy.get('[data-qa="state"]').type(user.state)
    cy.get('[data-qa="city"]').type(user.city)
    cy.get('[data-qa="zipcode"]').type(user.zipcode)
    cy.get('[data-qa="mobile_number"]').type(user.mobileNumber)
  }

  createAccount() {
    cy.get('[data-qa="create-account"]').click()
  }
}

export default new SignupPage()
