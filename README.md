# Automation Exercise - Cypress

Trabalho de Conclusão da disciplina de Automação Web (PGATS). Automação em Cypress dos casos de teste
da página [Test Cases](https://automationexercise.com/test_cases) do site Automation Exercise.

## Casos automatizados

| Caso | Descrição |
|------|-----------|
| 1 | Register User |
| 2 | Login User with correct email and password |
| 3 | Login User with incorrect email and password |
| 4 | Logout User |
| 5 | Register User with existing email |
| 8 | Verify All Products and product detail page |
| 9 | Search Product |
| 10 | Verify Subscription in home page |
| 15 | Place Order: Register before Checkout |
| 16 | Place Order: Login before Checkout |

## Estrutura

```
cypress/
├── e2e/automation-exercise.cy.js   # Casos de teste
└── support/
    ├── pages/                      # Page Objects (seletores e ações de cada página)
    ├── helpers/userFactory.js      # Massa de dados dinâmica com Faker
    ├── commands.js                 # Comandos customizados de API (criar/excluir usuário)
    └── e2e.js                      # Setup global e registro do reporter
```

## Boas práticas aplicadas

- **Page Objects** para modularizar seletores e ações.
- **Seletores estáveis**: prioridade para `data-qa` e `id`, sem XPath.
- **Massa de dados dinâmica** com `@faker-js/faker`, evitando conflito entre execuções.
- **Pré-condições via API** (`/api/createAccount`) nos casos que precisam de usuário existente, e
  **limpeza via API** (`/api/deleteAccount`) no `afterEach`.
- **Bloqueio de anúncios** (`blockHosts`) para evitar vinhetas que quebram a navegação.
- **Retries** no modo `run` para reduzir instabilidade do site público.

## Como executar

```bash
npm install
npm test          # execução headless + relatório
npm run cy:open   # modo interativo
```

O relatório HTML é gerado em `cypress/reports/index.html` com `cypress-mochawesome-reporter`.

## CI - GitHub Actions

O workflow [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml) roda a cada push na `main`,
em pull requests e manualmente. Ao final, o relatório Mochawesome fica disponível como artefato
**relatorio-cypress** na página da execução (aba *Actions*).
