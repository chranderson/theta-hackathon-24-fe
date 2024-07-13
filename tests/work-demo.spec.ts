import { test, expect } from '@playwright/test';

test('worker-demo exists', async ({ page }) => {
  await page.goto('/worker-demo');
});

test('ping count increases when Ping Worker button is pressed', async ({
  page
}) => {
  await page.goto('/worker-demo');
  await expect(page.getByText('Ping Count: 0')).toBeVisible();
  await page.getByRole('button', { name: 'Ping Worker' }).click();
  await expect(page.getByText('Ping Count: 1')).toBeVisible();
});
