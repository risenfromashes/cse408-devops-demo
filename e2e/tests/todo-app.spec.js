// @ts-check
import { test, expect } from '@playwright/test';


const placeholder = /Add a new task.../i;

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the todo app before each test
    await page.goto('/');
  });

  test('should load the todo application', async ({ page }) => {
    // Verify that the todo app has loaded
    await expect(page).toHaveTitle(/Todo/i);
  });

  test('should add a new todo item', async ({ page }) => {
    // wait for the page to load
    await page.waitForLoadState('networkidle');
    // Create a unique todo text
    const todoText = `Test Todo ${Date.now()}`;
    
    // Find the input field and add a new todo
    const inputField = page.getByPlaceholder(placeholder) || 
                       page.getByRole('textbox').first();
    await expect(inputField).toBeVisible();
    
    await inputField.fill(todoText);
    await inputField.press('Enter');
    
    // Verify the todo was added to the list
    await expect(page.getByText(todoText)).toBeVisible();
  });

  test('should mark a todo as completed', async ({ page }) => {
    // wait for the page to load
    await page.waitForLoadState('networkidle');
    // Create a todo to be completed
    const todoText = `Complete Me ${Date.now()}`;
    
    // Find the input field and add a new todo
    const inputField = page.getByPlaceholder(placeholder) || 
                       page.getByRole('textbox').first();
    await expect(inputField).toBeVisible();
    
    await inputField.fill(todoText);
    await inputField.press('Enter');
    
    // Find the created todo and click its checkbox
    const todoItem = page.getByText(todoText).locator('../..').first();
    const checkbox = todoItem.locator('input[type="checkbox"]');

    await expect(checkbox).toBeVisible();
    
    // Click the checkbox to mark the todo as completed
    await checkbox.click();
    // Verify the checkbox is checked
    await expect(checkbox).toBeChecked();

    // After page reload, verify the todo is still marked as completed
    await page.reload();
    await expect(checkbox).toBeChecked();
  });

  test('should delete a todo item', async ({ page }) => {
    // wait for the page to load
    await page.waitForLoadState('networkidle');
    // Create a todo to be deleted
    const todoText = `Delete Me ${Date.now()}`;
    
    // Find the input field and add a new todo
    const inputField = page.getByPlaceholder(placeholder) || 
                       page.getByRole('textbox').first();
    await expect(inputField).toBeVisible();
    
    await inputField.fill(todoText);
    await inputField.press('Enter');
    
    // Find the created todo
    const todoItem = page.getByText(todoText).locator('../../..').first();
    
    // Click the delete button (assuming it's a button with an X or trash icon)
    // This may need adjustment based on your actual UI
    const deleteButton = todoItem.getByRole('button') ||
                         todoItem.locator('button');

    // check if the delete button is visible
    await expect(deleteButton).toBeVisible();
    
    await deleteButton.click();
    
    // Verify the todo was removed
    await expect(page.getByText(todoText)).not.toBeVisible();
  });
});