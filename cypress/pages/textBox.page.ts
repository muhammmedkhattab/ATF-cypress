import { BasePage } from './base.page';

export class TextBoxPage extends BasePage {
  constructor() {
    super('/text-box');
  }

  fillForm(name: string, email: string, currentAddress: string, permanentAddress: string): void {
    cy.get('#userName').clear().type(name);
    cy.get('#userEmail').clear().type(email);
    cy.get('#currentAddress').clear().type(currentAddress);
    cy.get('#permanentAddress').clear().type(permanentAddress);
  }

  submit(): void {
    cy.get('#submit').click({ force: true });
  }

  assertOutputContains(text: string): void {
    cy.get('#output').should('contain.text', text);
  }
}
