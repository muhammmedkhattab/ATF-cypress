import { WebTablesPage } from '../../pages/webTables.page';

describe('UI - Web Tables', () => {
  const page = new WebTablesPage();

  it('searches table by first name @smoke', () => {
    page.open();
    page.search('Cierra');
    page.assertRowContains('Cierra');
  });

  it('searches table by email', () => {
    page.open();
    page.search('cierra@example.com');
    page.assertRowContains('cierra@example.com');
  });

  it('returns empty state for unknown user', () => {
    page.open();
    page.search('Unknown Name');
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('clears search input', () => {
    page.open();
    page.search('Alden');
    cy.get('#searchBox').clear().should('have.value', '');
  });

  it('has Add button visible', () => {
    page.open();
    cy.get('#addNewRecordButton').should('be.visible');
  });
});
