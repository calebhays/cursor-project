import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Reconstruct __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Native env file parsing when running locally (skips in CI)
if (!process.env.CI) {
  const environment = process.env.ENV || 'dev';
  // Point to the 'envs' subfolder as shown in your directory tree
  const envPath = path.resolve(__dirname, 'envs', `local-${environment}.env`);

  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=');
        let val = values.join('=').trim();
        val = val.replace(/^["']|["']$/g, '').trim();

        if (key && !process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    });
  } else {
    throw new Error(`[CONFIG ERROR] Environment file not found at: ${envPath}`);
  }
}

// Strictly pull from process.env (loaded from env file locally or GitHub Secrets/Vars in CI)
const BASE_URL = process.env.BASE_URL?.trim();
const BACKEND_URL = process.env.BACKEND_URL?.trim();

// Fail immediately with a clear message if values are missing
if (!BASE_URL) {
  throw new Error('BASE_URL environment variable is missing. Check your local-*.env file or GitHub Secrets.');
}
if (!BACKEND_URL) {
  throw new Error('BACKEND_URL environment variable is missing. Check your local-*.env file or GitHub Secrets.');
}

export default defineConfig({
  testDir: './', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'e2e-chromium',
      testDir: './e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api-tests',
      testDir: './api',
      use: {
        baseURL: BACKEND_URL,
      },
    },
  ],

  webServer: [
    {
      command: 'npm run dev --workspace=backend',
      url: `${BACKEND_URL}/api/hello`,
      reuseExistingServer: !process.env.CI,
      cwd: '../',
    },
    {
      command: 'npm run dev --workspace=frontend',
      url: BASE_URL,
      reuseExistingServer: !process.env.CI,
      cwd: '../',
    },
  ],
});