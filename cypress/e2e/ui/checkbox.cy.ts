import { CheckBoxPage } from '../../pages/checkBox.page';

describe('UI - Checkbox', () => {
  const page = new CheckBoxPage();

  it('expands checkbox tree @smoke', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rc-tree-title', 'Desktop').should('be.visible');
  });

  it('selects Desktop and shows result', () => {
    page.open();
    page.expandAll();
    page.toggleDesktop();
    page.assertResultContains('desktop');
  });

  it('selects Notes child item', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rc-tree-title', 'Notes')
      .closest('.rc-tree-treenode')
      .find('.rc-tree-checkbox')
      .click();
    page.assertResultContains('notes');
  });

  it('selects Commands child item', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rc-tree-title', 'Commands')
      .closest('.rc-tree-treenode')
      .find('.rc-tree-checkbox')
      .click();
    page.assertResultContains('commands');
  });

  it('clears selection when clicked twice', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rc-tree-title', 'Desktop')
      .closest('.rc-tree-treenode')
      .find('.rc-tree-checkbox')
      .click()
      .click();
    // When nothing is selected, no span.text-success elements exist at all
    cy.contains('span.text-success', 'desktop').should('not.exist');
  });
});
