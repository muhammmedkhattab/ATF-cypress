export abstract class BasePage {
  constructor(private readonly path: string) {}

  open(): void {
    cy.visit(this.path);
  }

  assertUrlIncludes(fragment: string): void {
    cy.url().should('include', fragment);
  }
}
