export class ReqresClient {
  private headers(): Record<string, string> {
    const apiKey = Cypress.env('reqresApiKey') as string;
    return apiKey ? { 'x-api-key': apiKey } : {};
  }

  getUsers(page = 1): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/users`,
      qs: { page },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  getUser(id: number): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/users/${id}`,
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  createUser(name: string, job: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/users`,
      body: { name, job },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  updateUser(id: number, name: string, job: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiBaseUrl')}/users/${id}`,
      body: { name, job },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  patchUser(id: number, job: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'PATCH',
      url: `${Cypress.env('apiBaseUrl')}/users/${id}`,
      body: { job },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  deleteUser(id: number): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/users/${id}`,
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  login(email: string, password: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/login`,
      body: { email, password },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }

  register(email: string, password?: string): Cypress.Chainable<Cypress.Response<unknown>> {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/register`,
      body: { email, password },
      headers: this.headers(),
      failOnStatusCode: false,
    });
  }
}
