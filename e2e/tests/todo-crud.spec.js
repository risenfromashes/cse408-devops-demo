import { test, expect } from '@playwright/test';

test.describe('Todo CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the app before each test
    await page.goto('/');
  });

  test('should create a new todo', async ({ page }) => {
    // Create a unique todo
    const uniqueTodo = `Test todo ${Date.now()}`;
    
    // Type a new todo
    await page.getByPlaceholder(/Add a new task/i).fill(uniqueTodo);
    
    // Click the add button
    await page.getByRole('button', { name: /add task/i }).click();
    
    // Verify the todo was added
    const todoItem = page.getByText(uniqueTodo);
    await expect(todoItem).toBeVisible();
  });

  test('should mark a todo as complete', async ({ page }) => {
    // Create a unique todo
    const uniqueTodo = `Todo to complete ${Date.now()}`;
    
    // Add the todo
    await page.getByPlaceholder(/Add a new task/i).fill(uniqueTodo);
    await page.getByRole('button', { name: /add task/i }).click();
    
    // Find and click the checkbox to mark it as complete
    const todoText = page.getByText(uniqueTodo);
    const todoItem = todoText.locator('xpath=../..');
    const checkbox = todoItem.getByRole('checkbox');
    await checkbox.check();
    
    // Verify it's marked as complete (has line-through style)
    await expect(todoText).toHaveClass(/line-through/);
  });

  test('should delete a todo', async ({ page }) => {
    // Create a unique todo
    const uniqueTodo = `Todo to delete ${Date.now()}`;
    
    // Add the todo
    await page.getByPlaceholder(/Add a new task/i).fill(uniqueTodo);
    await page.getByRole('button', { name: /add task/i }).click();
    
    // Verify it was added
    const todoText = page.getByText(uniqueTodo);
    await expect(todoText).toBeVisible();
    
    // Find and click the delete button
    const todoItem = todoText.locator('xpath=../..');
    const deleteButton = todoItem.getByLabel('Delete task');
    await deleteButton.click();
    
    // Verify it's been deleted
    await expect(todoText).not.toBeVisible();
  });
});