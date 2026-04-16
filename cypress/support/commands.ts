declare global {
  namespace Cypress {
    interface Chainable {
      visitDemoPath(path: string): Chainable<void>;
      getByDataId(id: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('visitDemoPath', (path: string) => {
  cy.visit(path);
});

Cypress.Commands.add('getByDataId', (id: string) => {
  return cy.get(`[data-testid="${id}"]`);
});

export {};
