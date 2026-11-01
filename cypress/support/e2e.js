import 'cypress-mochawesome-reporter/register'
import './commands'

// Scripts de terceiros do site (anúncios) lançam erros que não fazem parte da aplicação
Cypress.on('uncaught:exception', () => false)
