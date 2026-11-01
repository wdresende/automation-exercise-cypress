import homePage from '../support/pages/HomePage'
import loginPage from '../support/pages/LoginPage'
import signupPage from '../support/pages/SignupPage'
import accountPage from '../support/pages/AccountPage'
import productsPage from '../support/pages/ProductsPage'
import productDetailPage from '../support/pages/ProductDetailPage'
import cartPage from '../support/pages/CartPage'
import checkoutPage from '../support/pages/CheckoutPage'
import paymentPage from '../support/pages/PaymentPage'
import { buildUser, buildCard } from '../support/helpers/userFactory'

describe('Automation Exercise - Test Cases', () => {
  let user

  beforeEach(() => {
    user = buildUser()
    homePage.visit()
  })

  // Garante a limpeza da massa mesmo quando o teste falha antes de excluir a conta pela UI
  afterEach(() => {
    cy.deleteUserViaApi(user)
  })

  context('Usuário', () => {
    it('Test Case 1: Register User', () => {
      homePage.goToSignupLogin()
      loginPage.shouldBeVisible()
      loginPage.startSignup(user.name, user.email)
      signupPage.fillAccountInformation(user)
      signupPage.fillAddressInformation(user)
      signupPage.createAccount()
      accountPage.shouldShowAccountCreated()
      accountPage.continue()
      homePage.shouldBeLoggedInAs(user.name)
      homePage.deleteAccount()
      accountPage.shouldShowAccountDeleted()
      accountPage.continue()
    })

    it('Test Case 2: Login User with correct email and password', () => {
      cy.createUserViaApi(user)
      homePage.goToSignupLogin()
      loginPage.shouldBeVisible()
      loginPage.login(user.email, user.password)
      homePage.shouldBeLoggedInAs(user.name)
      homePage.deleteAccount()
      accountPage.shouldShowAccountDeleted()
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
      homePage.goToSignupLogin()
      loginPage.shouldBeVisible()
      loginPage.login(user.email, user.password)
      loginPage.shouldShowLoginError()
    })

    it('Test Case 4: Logout User', () => {
      cy.createUserViaApi(user)
      homePage.goToSignupLogin()
      loginPage.login(user.email, user.password)
      homePage.shouldBeLoggedInAs(user.name)
      homePage.logout()
      loginPage.shouldBeVisible()
    })

    it('Test Case 5: Register User with existing email', () => {
      cy.createUserViaApi(user)
      homePage.goToSignupLogin()
      loginPage.shouldBeVisible()
      loginPage.startSignup(user.name, user.email)
      loginPage.shouldShowEmailAlreadyExists()
    })
  })

  context('Produtos', () => {
    it('Test Case 8: Verify All Products and product detail page', () => {
      homePage.goToProducts()
      productsPage.shouldBeVisible()
      productsPage.viewFirstProduct()
      productDetailPage.shouldShowProductDetails()
    })

    it('Test Case 9: Search Product', () => {
      const term = 'Jeans'

      homePage.goToProducts()
      productsPage.shouldBeVisible()
      productsPage.search(term)
      productsPage.shouldShowSearchResults(term)
    })

    it('Test Case 10: Verify Subscription in home page', () => {
      homePage.subscribe(user.email)
      homePage.shouldShowSubscriptionSuccess()
    })
  })

  context('Pedidos', () => {
    const productIds = [1, 2]

    function addProductsAndGoToCheckout() {
      homePage.goToProducts()
      productsPage.addProductToCart(productIds[0])
      productsPage.continueShopping()
      productsPage.addProductToCart(productIds[1])
      productsPage.viewCartFromModal()
      cartPage.shouldBeVisible()
      cartPage.shouldContainProducts(productIds.length)
      cartPage.proceedToCheckout()
    }

    function reviewAndPayOrder() {
      checkoutPage.shouldShowAddressDetails(user)
      checkoutPage.shouldShowReviewOrder(productIds.length)
      checkoutPage.placeOrder('Pedido gerado pela automação do trabalho de conclusão')
      paymentPage.pay(buildCard(user))
      paymentPage.shouldShowOrderPlaced()
      homePage.deleteAccount()
      accountPage.shouldShowAccountDeleted()
      accountPage.continue()
    }

    it('Test Case 15: Place Order: Register before Checkout', () => {
      homePage.goToSignupLogin()
      loginPage.startSignup(user.name, user.email)
      signupPage.fillAccountInformation(user)
      signupPage.fillAddressInformation(user)
      signupPage.createAccount()
      accountPage.shouldShowAccountCreated()
      accountPage.continue()
      homePage.shouldBeLoggedInAs(user.name)

      addProductsAndGoToCheckout()
      reviewAndPayOrder()
    })

    it('Test Case 16: Place Order: Login before Checkout', () => {
      cy.createUserViaApi(user)
      homePage.goToSignupLogin()
      loginPage.login(user.email, user.password)
      homePage.shouldBeLoggedInAs(user.name)

      addProductsAndGoToCheckout()
      reviewAndPayOrder()
    })
  })
})
