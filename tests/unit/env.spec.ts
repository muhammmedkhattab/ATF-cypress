import { expect } from 'chai';
import { parseEnv } from '../../src/framework/config/env';

describe('parseEnv', () => {
  it('uses defaults', () => {
    const parsed = parseEnv({});
    expect(parsed.baseUrl).to.equal('https://demoqa.com');
    expect(parsed.aiEnabled).to.equal(false);
  });

  it('parses true flag', () => {
    const parsed = parseEnv({ AI_ENABLED: 'true' });
    expect(parsed.aiEnabled).to.equal(true);
  });
});
