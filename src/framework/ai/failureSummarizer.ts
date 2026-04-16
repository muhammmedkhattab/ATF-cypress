import { buildFailurePrompt, FailedTestCase } from './promptBuilder';

export const buildLocalSummary = (failures: FailedTestCase[]): string => {
  const prompt = buildFailurePrompt(failures);
  return [
    '# AI Failure Summary (Local Heuristic)',
    '',
    `Total failures: ${failures.length}`,
    '',
    '## Suggested Actions',
    '- Stabilize selectors via page objects',
    '- Add explicit preconditions before click/type actions',
    '- Validate API contracts with strict key checks',
    '',
    '## Prompt Snapshot',
    prompt,
  ].join('\n');
};
