import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Team Theta/);
});

test('has description', async ({ page }) => {
  await page.goto('/');
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    'content',
    /Theta Network Hackathon/
  );
});

test('heading', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Theta Network Hackathon' })
  ).toBeVisible();
});

test('Connect Wallet button', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Connect Wallet' })
  ).toBeVisible();
});
