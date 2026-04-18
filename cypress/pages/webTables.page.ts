import { BasePage } from './base.page';

export class WebTablesPage extends BasePage {
  constructor() {
    super('/webtables');
  }

  search(value: string): void {
    cy.get('#searchBox').should('be.visible').clear().type(value);
  }

  assertRowContains(text: string): void {
    cy.get('tbody').should('contain.text', text);
  }
}
