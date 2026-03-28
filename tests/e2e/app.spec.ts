import { test, expect } from '@playwright/test';

test('frontend displays backend data', async ({ page }) => {
  // Go to the React app
  await page.goto('/');

  // Wait for the message to change from "Loading..." to the backend message
  const backendMessage = page.locator('p', { hasText: 'Hello from the Express Backend!' });
  
  // Verify it is visible on the screen
  await expect(backendMessage).toBeVisible();
});