import { BasePage } from './base.page';

export class CheckBoxPage extends BasePage {
  constructor() {
    super('/checkbox');
  }

  expandAll(): void {
    cy.get('.check-box-tree-wrapper').should('exist');
    // DemoQA uses rc-tree (not react-checkbox-tree). Collapsed nodes have
    // span.rc-tree-switcher_close. Click ONE at a time and re-query each
    // iteration — clicking multiple at once causes stale DOM ref errors
    // because the tree re-renders after every expansion.
    for (let i = 0; i < 8; i++) {
      cy.get('body').then(($body) => {
        if ($body.find('.rc-tree-switcher_close').length > 0) {
          cy.get('.rc-tree-switcher_close').first().click({ force: true });
        }
      });
    }
  }

  toggleDesktop(): void {
    cy.contains('span.rc-tree-title', 'Desktop')
      .closest('.rc-tree-treenode')
      .find('.rc-tree-checkbox')
      .click();
  }

  assertResultContains(text: string): void {
    cy.contains('span.text-success', text).should('exist');
  }
}
