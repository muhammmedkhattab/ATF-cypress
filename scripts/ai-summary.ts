import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { buildFailurePrompt, FailedTestCase } from '../src/framework/ai/promptBuilder';
import { buildLocalSummary } from '../src/framework/ai/failureSummarizer';

const reportPath = process.argv[2] || 'results/junit/results.xml';
const outputPath = process.argv[3] || 'results/ai-summary.md';

const readFailures = (xmlFile: string): FailedTestCase[] => {
  if (!fs.existsSync(xmlFile)) {
    return [];
  }

  const parser = new XMLParser({ ignoreAttributes: false });
  const raw = fs.readFileSync(xmlFile, 'utf-8');
  const parsed = parser.parse(raw) as any;
  const suites = parsed.testsuites?.testsuite || parsed.testsuite || [];
  const suiteList = Array.isArray(suites) ? suites : [suites];
  const failures: FailedTestCase[] = [];

  suiteList.forEach((suite: any) => {
    const testcases = Array.isArray(suite.testcase) ? suite.testcase : suite.testcase ? [suite.testcase] : [];
    testcases.forEach((testcase: any) => {
      if (testcase.failure) {
        failures.push({
          title: testcase['@_name'] || testcase.name || 'Unknown test',
          message: testcase.failure['#text'] || testcase.failure['@_message'] || 'No failure message',
        });
      }
    });
  });

  return failures;
};

const callOpenAi = async (prompt: string): Promise<string | null> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a senior QA engineer producing concise failure triage summaries.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as any;
  return data.choices?.[0]?.message?.content || null;
};

(async () => {
  const failures = readFailures(reportPath);
  if (!failures.length) {
    console.log('No failures found; AI summary skipped.');
    process.exit(0);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const prompt = buildFailurePrompt(failures);
  const aiOutput = process.env.AI_ENABLED === 'true' ? await callOpenAi(prompt) : null;
  const markdown = aiOutput || buildLocalSummary(failures);
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`Summary written to ${outputPath}`);
})();
