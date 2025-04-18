import { test, expect } from '@playwright/test';

test.describe('Todo App Persistence and Error States', () => {
  test('should persist todos between page reloads', async ({ page }) => {
    // Create a unique todo
    const uniqueTodo = `Persistent Todo ${Date.now()}`;
    
    // Navigate to the app
    await page.goto('/');
    
    // Add the unique todo
    await page.getByPlaceholder(/Add a new task/i).fill(uniqueTodo);
    await page.getByRole('button', { name: /add task/i }).click();
    
    // Verify it was added
    await expect(page.getByText(uniqueTodo)).toBeVisible();
    
    // Reload the page
    await page.reload();
    
    // Verify todo is still there after reload
    await expect(page.getByText(uniqueTodo)).toBeVisible();
  });

  test('should show empty state when no todos exist', async ({ page }) => {
    // This test requires a clean slate, so we need to delete any existing todos
    await page.goto('/');
    
    // Wait for the page to load and check for todos
    try {
      // Look for delete buttons and click them
      while (await page.getByLabel('Delete task').first().isVisible()) {
        await page.getByLabel('Delete task').first().click();
        // Wait a bit for the deletion to take effect
        await page.waitForTimeout(300);
      }
    } catch (e) {
      // No more delete buttons, we're good
    }
    
    // Verify the empty state message is shown
    await expect(page.getByText(/You have no tasks yet/i)).toBeVisible();
  });
});