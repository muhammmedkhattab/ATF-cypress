import { expect } from 'chai';
import { buildDemoUser } from '../../src/framework/data/userBuilder';

describe('buildDemoUser', () => {
  it('returns default user shape', () => {
    const user = buildDemoUser();
    expect(user.fullName).to.equal('Staff Tester');
    expect(user.email).to.include('@');
  });

  it('applies overrides safely', () => {
    const user = buildDemoUser({ fullName: 'Custom User' });
    expect(user.fullName).to.equal('Custom User');
  });
});
