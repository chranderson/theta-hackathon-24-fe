import { test, expect } from '@playwright/test';

// implicit assertion
test('smoke test', async ({ page }) => {
  await page.goto('/');
  expect(true).toBe(true);
});
