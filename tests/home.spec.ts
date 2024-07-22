import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Team Theta/);
});

test.skip('has description', async ({ page }) => {
  await page.goto('/');
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    'content',
    /Theta Network Hackathon/
  );
});

test.skip('heading', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Theta Network Hackathon' })
  ).toBeVisible();
});

test.skip('Connect Wallet button', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Connect Wallet' })
  ).toBeVisible();
});
