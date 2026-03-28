import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Point to the base of your test folders
  testDir: './', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // Vite's default URL
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    // 1. E2E Project - Runs browser tests in the 'e2e' folder
    {
      name: 'e2e-chromium',
      testDir: './e2e',
      use: { ...devices['Desktop Chrome'] },
    },

    // 2. API Project - Runs tests in the 'api' folder (no browser needed)
    {
      name: 'api-tests',
      testDir: './api',
      use: {
        baseURL: 'http://localhost:3001', // Direct link to backend
      },
    },
  ],

  // Automatically start both servers
  webServer: [
    {
      command: 'npm run dev --workspace=backend',
      url: 'http://localhost:3001/api/hello',
      reuseExistingServer: !process.env.CI,
      cwd: '../', // Run from the root folder
    },
    {
      command: 'npm run dev --workspace=frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      cwd: '../', // Run from the root folder
    },
  ],
});