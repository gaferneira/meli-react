import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { ProductsTable } from "../../../src/ui/components/ProductsTable";
import store from "../../../src/ui/redux/store";
import type { Product } from "@/domain";

// Initialize i18next synchronously with inline resources so useTranslation()
// resolves immediately instead of suspending on the app's XHR backend, which
// has nothing to fetch from in the test environment.
void i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
});

const buildProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${i}`,
    title: `Product ${i}`,
    price: i * 10,
    tags: [],
  }));

const renderTable = (products: Product[], favorites: Product[] = []) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductsTable products={products} favorites={favorites} />
      </MemoryRouter>
    </Provider>,
  );

test("renders only the first page of products (page size 5)", () => {
  //GIVEN
  const products = buildProducts(7);
  //WHEN
  renderTable(products);
  //THEN
  expect(screen.getAllByText(/Product \d/)).toHaveLength(5);
  expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
});

test("advancing to the next page shows the remaining products", async () => {
  //GIVEN
  const products = buildProducts(7);
  renderTable(products);
  //WHEN
  await userEvent.click(screen.getByRole("button", { name: /next page/i }));
  //THEN
  expect(screen.getAllByText(/Product \d/)).toHaveLength(2);
  expect(screen.getByText("Product 5")).toBeInTheDocument();
  expect(screen.getByText("Product 6")).toBeInTheDocument();
});

test("marks a product as favorite when its checkbox is toggled", async () => {
  //GIVEN
  const products = buildProducts(1);
  renderTable(products);
  const checkbox = screen.getByRole("checkbox", { name: /favorites/i });
  //WHEN
  await userEvent.click(checkbox);
  //THEN
  expect(checkbox).toBeChecked();
});

test("pre-checks the checkbox for products already in favorites", () => {
  //GIVEN
  const products = buildProducts(1);
  //WHEN
  renderTable(products, products);
  //THEN
  expect(screen.getByRole("checkbox", { name: /favorites/i })).toBeChecked();
});
