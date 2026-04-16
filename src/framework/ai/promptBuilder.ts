export interface FailedTestCase {
  title: string;
  message: string;
}

export const buildFailurePrompt = (failures: FailedTestCase[]): string => {
  const body = failures.map((f, i) => `${i + 1}. ${f.title} -> ${f.message}`).join('\n');
  return `You are a senior QA engineer. Summarize root causes, flakiness signals, and remediation steps.\n${body}`;
};
