export interface SelectorDiagnostic {
  selector: string;
  probableCause: string;
  recommendation: string;
}

export const buildSelectorDiagnostic = (selector: string, domHint = ''): SelectorDiagnostic => {
  if (selector.includes(':contains')) {
    return {
      selector,
      probableCause: 'Legacy jQuery contains selector is brittle in dynamic UI',
      recommendation: 'Use semantic attribute selectors (data-testid) wrapped in page objects',
    };
  }

  return {
    selector,
    probableCause: domHint || 'Element likely changed or rendered asynchronously',
    recommendation: 'Prefer stable test ids and add explicit ready-state assertions before interaction',
  };
};
