import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display search interface', async ({ page }) => {
    await expect(page.getByRole('button', { name: /search by drug/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /search by disease/i })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('should switch between drug and disease search modes', async ({ page }) => {
    // Test drug search mode (default)
    await expect(page.getByRole('button', { name: /search by drug/i })).toHaveClass(/bg-blue-500/);
    
    // Switch to disease search
    await page.getByRole('button', { name: /search by disease/i }).click();
    await expect(page.getByRole('button', { name: /search by disease/i })).toHaveClass(/bg-blue-500/);
    
    // Verify placeholder text changes
    await expect(page.getByRole('textbox')).toHaveAttribute('placeholder', /rheumatoid arthritis/i);
  });

  test('should perform drug search', async ({ page }) => {
    await page.getByRole('textbox').fill('Aspirin');
    await page.getByRole('button', { name: /^search$/i }).click();
    
    // Wait for results
    await expect(page.getByText(/potential applications/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/network visualization/i)).toBeVisible();
  });

  test('should perform disease search', async ({ page }) => {
    // Switch to disease mode
    await page.getByRole('button', { name: /search by disease/i }).click();
    
    await page.getByRole('textbox').fill('Rheumatoid Arthritis');
    await page.getByRole('button', { name: /^search$/i }).click();
    
    // Wait for results
    await expect(page.getByText(/potential applications/i)).toBeVisible({ timeout: 10000 });
  });

  test('should be accessible via keyboard', async ({ page }) => {
    // Tab to search input
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Type search query
    await page.keyboard.type('Aspirin');
    
    // Press Enter to search
    await page.keyboard.press('Enter');
    
    // Verify results appear
    await expect(page.getByText(/potential applications/i)).toBeVisible({ timeout: 10000 });
  });
});