import { faker } from '@faker-js/faker'

export function buildUser() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    name: `${firstName} ${lastName}`,
    email: `qa_${Date.now()}_${faker.string.alphanumeric(6).toLowerCase()}@test.com`,
    password: faker.internet.password({ length: 10 }),
    title: 'Mr',
    birthDay: '10',
    birthMonth: 'May',
    birthMonthNumber: '5',
    birthYear: '1990',
    firstName,
    lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.string.numeric(11),
  }
}

export function buildCard(user) {
  return {
    nameOnCard: user.name,
    number: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
  }
}
