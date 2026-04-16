import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      config.env.apiBaseUrl = process.env.CYPRESS_API_BASE_URL || 'https://reqres.in/api';
      config.env.reqresApiKey = process.env.REQRES_API_KEY || '';
      config.env.aiEnabled = process.env.AI_ENABLED || 'false';
      return config;
    }
  },
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  retries: { runMode: 1, openMode: 0 }
});
