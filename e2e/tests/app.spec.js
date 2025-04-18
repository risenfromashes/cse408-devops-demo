import { test, expect } from '@playwright/test';

test('should load the todo application', async ({ page }) => {
  // Navigate to the application
  await page.goto('/');

  // Check if the page has loaded correctly - look for the title
  await expect(page).toHaveTitle(/Task Manager/);
  
  // Check if the main components are visible
  const todoForm = page.getByPlaceholder(/Add a new task/);
  await expect(todoForm).toBeVisible();
  
  const addButton = page.getByRole('button', { name: /Add task/i });
  await expect(addButton).toBeVisible();
});