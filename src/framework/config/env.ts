export interface FrameworkEnv {
  baseUrl: string;
  apiBaseUrl: string;
  aiEnabled: boolean;
}

export const parseEnv = (env: NodeJS.ProcessEnv): FrameworkEnv => ({
  baseUrl: env.CYPRESS_BASE_URL || 'https://demoqa.com',
  apiBaseUrl: env.CYPRESS_API_BASE_URL || 'https://reqres.in/api',
  aiEnabled: (env.AI_ENABLED || 'false').toLowerCase() === 'true',
});
