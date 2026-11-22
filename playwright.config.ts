import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3103',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'Mobile Chrome (iPhone 14 / Pixel 7)',
      use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } },
    },
    {
      name: 'Small Mobile (320px)',
      use: { viewport: { width: 320, height: 568 } },
    },
  ],
  webServer: {
    command: 'node .next/standalone/server.js',
    url: 'http://localhost:3103/api/health',
    env: {
      PORT: '3103',
      HOSTNAME: '0.0.0.0',
    },
    reuseExistingServer: true,
    timeout: 120000,
  },
});
