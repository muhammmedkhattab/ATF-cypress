import { expect } from 'chai';
import { assertStatus, requireKeys } from '../../src/framework/api/responseValidator';

describe('responseValidator', () => {
  it('accepts matching status', () => {
    expect(() => assertStatus(200, 200)).to.not.throw();
  });

  it('throws on status mismatch', () => {
    expect(() => assertStatus(500, 200)).to.throw('Expected status 200 but got 500');
  });

  it('validates required keys', () => {
    expect(() => requireKeys({ id: 1, name: 'a' }, ['id', 'name'])).to.not.throw();
  });
});
