import { TextBoxPage } from '../../pages/textBox.page';
import { buildDemoUser } from '../../../src/framework/data/userBuilder';

describe('UI - Text Box', () => {
  const page = new TextBoxPage();

  it('fills text box form with valid data @smoke', () => {
    const user = buildDemoUser();
    page.open();
    page.fillForm(user.fullName, user.email, user.currentAddress, user.permanentAddress);
    page.submit();
    page.assertOutputContains(user.fullName);
  });

  it('shows submitted email in output', () => {
    const user = buildDemoUser();
    page.open();
    page.fillForm(user.fullName, user.email, user.currentAddress, user.permanentAddress);
    page.submit();
    page.assertOutputContains(user.email);
  });

  it('accepts long address fields', () => {
    const user = buildDemoUser({ currentAddress: 'x'.repeat(50), permanentAddress: 'y'.repeat(50) });
    page.open();
    page.fillForm(user.fullName, user.email, user.currentAddress, user.permanentAddress);
    page.submit();
    page.assertOutputContains(user.currentAddress);
  });

  it('keeps URL at text-box route', () => {
    page.open();
    page.assertUrlIncludes('/text-box');
  });

  it('renders submit button', () => {
    page.open();
    cy.get('#submit').should('be.visible');
  });
});
