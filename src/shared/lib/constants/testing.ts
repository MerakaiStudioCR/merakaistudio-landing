export const isTestEnvironment =
  process.env.PLAYWRIGHT_TEST_BASE_URL?.includes('localhost') ||
  (process.env.CI === 'true' && process.env.PLAYWRIGHT_TEST_BASE_URL)
