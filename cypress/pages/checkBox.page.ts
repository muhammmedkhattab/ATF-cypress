import { BasePage } from './base.page';

export class CheckBoxPage extends BasePage {
  constructor() {
    super('/checkbox');
  }

  expandAll(): void {
    cy.get('body').then(($body) => {
      const selectors = [
        'button[title="Expand all"]',
        'button[aria-label="Expand all"]',
        'button[title*="Expand"]',
      ];
      const selector = selectors.find((entry) => $body.find(entry).length > 0);

      if (selector) {
        cy.get(selector).first().click({ force: true });
      }
    });
  }

  toggleDesktop(): void {
    cy.contains('span.rct-title', 'Desktop').parent().find('.rct-checkbox').click();
  }

  assertResultContains(text: string): void {
    cy.get('#result').should('contain.text', text);
  }
}
