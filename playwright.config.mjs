import { defineConfig, devices } from '@playwright/test'

// Browser plugin not available; use Playwright against the static production build.
export default defineConfig({
  testDir: '.vitepress/tests',
  timeout: 45_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173/SAP-Knowledge-Map/',
    channel: 'chrome',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], defaultBrowserType: 'chromium' } }
  ],
  webServer: {
    command: 'npm run docs:preview -- --host localhost --port 4173',
    url: 'http://localhost:4173/SAP-Knowledge-Map/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
})
