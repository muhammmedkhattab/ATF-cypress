import { expect } from 'chai';
import { buildSelectorDiagnostic } from '../../src/framework/selectors/diagnostics';

describe('buildSelectorDiagnostic', () => {
  it('flags brittle selectors', () => {
    const info = buildSelectorDiagnostic('div:contains("Save")');
    expect(info.recommendation).to.contain('data-testid');
  });

  it('returns fallback guidance', () => {
    const info = buildSelectorDiagnostic('#submit', 'Element hidden by modal');
    expect(info.probableCause).to.equal('Element hidden by modal');
  });
});
