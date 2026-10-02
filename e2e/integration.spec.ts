import { test, expect } from "@playwright/test";

const products = Array.from({ length: 5 }, (_, i) => ({
  id: `MCO${i + 1}`,
  title: `Samsung product ${i + 1}`,
  price: 1000 * (i + 1),
  thumbnail: "",
  tags: [],
}));

test.describe("react app", () => {
  test.beforeEach(async ({ page }) => {
    // The real Mercado Libre API requires auth and is not reachable from CI.
    await page.route("**/sites/*/search*", (route) =>
      route.fulfill({ json: { results: products } }),
    );
    await page.route("**/items/*", (route) => {
      const id = route.request().url().split("/").pop();
      return route.fulfill({ json: products.find((p) => p.id === id) });
    });
    await page.goto("/");
  });

  test("displays countries list", async ({ page }) => {
    const countryItems = page.locator(".select-country li");
    await expect(countryItems).toHaveCount(19);
    await expect(countryItems.first()).toHaveText("Cuba");
    await expect(countryItems.last()).toHaveText("El Salvador");
  });

  test("can search products and set as favorites", async ({ page }) => {
    // Select colombia country
    await page.locator(".select-country > :nth-child(12)").click();

    // Search something
    const query = "Samsung";
    await page.locator("[name=search]").fill(query);
    await page.locator("[name=search]").press("Enter");
    await expect(page.locator(".products-table-row")).toHaveCount(5);

    // Check 2 items
    const checkboxes = page.locator(".products-table-row [type=checkbox]");
    await checkboxes.first().check();
    await expect(checkboxes.first()).toBeChecked();

    await checkboxes.last().check();
    await expect(checkboxes.last()).toBeChecked();

    // Go to favorites
    await page.locator("ul.nav-bar-list>li").nth(1).click();

    // Check number of favorites
    await expect(page.locator(".products-table-row")).toHaveCount(2);

    // Uncheck one favorite
    await page.locator(".products-table-row [type=checkbox]").last().click();

    // Check number of favorites again
    await expect(page.locator(".products-table-row")).toHaveCount(1);

    // Go back
    await page.goBack();

    // Check states of the items
    const checkboxesAfterBack = page.locator(
      ".products-table-row [type=checkbox]",
    );
    await expect(checkboxesAfterBack.first()).toBeChecked();
    await expect(checkboxesAfterBack.last()).not.toBeChecked();
  });
});
