import { expect } from 'chai';
import { buildFailurePrompt } from '../../src/framework/ai/promptBuilder';

describe('buildFailurePrompt', () => {
  it('builds readable summary prompt', () => {
    const prompt = buildFailurePrompt([{ title: 'fails', message: 'network timeout' }]);
    expect(prompt).to.contain('senior QA engineer');
    expect(prompt).to.contain('network timeout');
  });
});
