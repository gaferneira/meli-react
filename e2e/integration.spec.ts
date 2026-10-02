import { test, expect } from '@playwright/test';

test.describe('react app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays countries list', async ({ page }) => {
    const countryItems = page.locator('.select-country li');
    await expect(countryItems).toHaveCount(19);
    await expect(countryItems.first()).toHaveText('Cuba');
    await expect(countryItems.last()).toHaveText('El Salvador');
  });

  test('can search products and set as favorites', async ({ page }) => {
    // Select colombia country
    await page.locator('.select-country > :nth-child(12)').click();

    // Search something
    const query = 'Samsung';
    await page.locator('[name=search]').fill(query);
    await page.locator('[name=search]').press('Enter');
    await expect(page.locator('.MuiDataGrid-row')).toHaveCount(5);

    // Check 2 items
    const checkboxes = page.locator('.MuiDataGrid-row [type=checkbox]');
    await checkboxes.first().check();
    await expect(checkboxes.first()).toBeChecked();

    await checkboxes.last().check();
    await expect(checkboxes.last()).toBeChecked();

    // Go to favorites
    await page.locator('ul.nav-bar-list>li').nth(1).click();

    // Check number of favorites
    await expect(page.locator('.MuiDataGrid-row')).toHaveCount(2);

    // Uncheck one favorite
    await page.locator('.MuiDataGrid-row [type=checkbox]').last().uncheck();

    // Check number of favorites again
    await expect(page.locator('.MuiDataGrid-row')).toHaveCount(1);

    // Go back
    await page.goBack();

    // Check states of the items
    const checkboxesAfterBack = page.locator('.MuiDataGrid-row [type=checkbox]');
    await expect(checkboxesAfterBack.first()).toBeChecked();
    await expect(checkboxesAfterBack.last()).not.toBeChecked();
  });
});
