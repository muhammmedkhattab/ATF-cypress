import { CheckBoxPage } from '../../pages/checkBox.page';

describe('UI - Checkbox', () => {
  const page = new CheckBoxPage();

  it('expands checkbox tree @smoke', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rct-title', 'Desktop').should('be.visible');
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
    cy.contains('span.rct-title', 'Notes').parent().find('.rct-checkbox').click();
    page.assertResultContains('notes');
  });

  it('selects Commands child item', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rct-title', 'Commands').parent().find('.rct-checkbox').click();
    page.assertResultContains('commands');
  });

  it('clears selection when clicked twice', () => {
    page.open();
    page.expandAll();
    cy.contains('span.rct-title', 'Desktop').parent().find('.rct-checkbox').click().click();
    cy.get('#result').should('not.contain.text', 'desktop');
  });
});
