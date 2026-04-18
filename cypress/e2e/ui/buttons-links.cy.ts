describe('UI - Buttons and Links', () => {
  it('click me button triggers message @smoke', () => {
    cy.visit('/buttons');
    // Exact regex prevents matching "Double Click Me" or "Right Click Me"
    cy.contains('button', /^Click Me$/).click();
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

  it('created link element is present', () => {
    // DemoQA replaced the API-call href with javascript:throw new Error(...)
    // (React security block). Clicking causes an uncaught exception and
    // #linkResponse never shows a status. Verify the link element exists.
    cy.visit('/links');
    cy.get('#created').should('be.visible').and('contain.text', 'Created');
  });
});
