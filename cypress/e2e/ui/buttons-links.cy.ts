describe('UI - Buttons and Links', () => {
  it('click me button triggers message @smoke', () => {
    cy.visit('/buttons');
    cy.contains('button', 'Click Me').last().click();
    cy.get('#dynamicClickMessage').should('contain.text', 'dynamic click');
  });

  it('double click button triggers message', () => {
    cy.visit('/buttons');
    cy.get('#doubleClickBtn').dblclick();
    cy.get('#doubleClickMessage').should('contain.text', 'double click');
  });

  it('right click button triggers message', () => {
    cy.visit('/buttons');
    cy.get('#rightClickBtn').rightclick();
    cy.get('#rightClickMessage').should('contain.text', 'right click');
  });

  it('valid link opens API call message', () => {
    cy.visit('/links');
    cy.get('#simpleLink').should('have.attr', 'href');
  });

  it('created link returns created status message', () => {
    cy.visit('/links');
    cy.get('#created').click();
    cy.get('#linkResponse').should('contain.text', '201');
  });
});
