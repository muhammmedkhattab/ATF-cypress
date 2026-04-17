describe('checkbox result 2', () => {
  it('finds result output', () => {
    cy.visit('/checkbox');
    cy.get('.check-box-tree-wrapper').should('exist');
    cy.get('.rc-tree-switcher_close').first().click({ force: true });
    cy.wait(300);
    cy.contains('span.rc-tree-title', 'Desktop').closest('.rc-tree-treenode').find('.rc-tree-checkbox').click({ force: true });
    cy.wait(500);
    cy.get('body').then(($body) => {
      const allText = Array.from($body[0].querySelectorAll('*'))
        .filter((el: Element) => (el as HTMLElement).childElementCount === 0 && (el as HTMLElement).innerText?.toLowerCase().includes('desktop'))
        .map((el: Element) => ({ tag: el.tagName, id: (el as HTMLElement).id, cls: el.className?.toString().trim().slice(0, 60), text: (el as HTMLElement).innerText?.trim().slice(0, 80) }));
      cy.task('log', 'DESKTOP text found in: ' + JSON.stringify(allText.slice(0, 10)));
      
      // Also look at the page structure after the tree
      const afterTree = $body.find('.check-box-tree-wrapper').next();
      cy.task('log', 'After tree: ' + (afterTree[0]?.outerHTML?.slice(0, 300) || 'nothing'));
    });
    cy.screenshot('checkbox-result-area');
  });
});
