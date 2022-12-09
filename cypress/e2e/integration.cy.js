/// <reference types="cypress" />

describe("react app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("displays countries list", () => {
    cy.get(".select-country li").should("have.length", 19);
    cy.get(".select-country li").first().should("have.text", "Cuba");
    cy.get(".select-country li").last().should("have.text", "El Salvador");
  });

  it("can search products and set as favorites", () => {
    //Select colombia country
    cy.get(".select-country > :nth-child(12)").click();

    //Search something
    const query = "Samsung";
    cy.get("[name=search]").type(`${query}{enter}`);
    cy.get(".MuiDataGrid-row").should("have.length", 5);

    // Check 2 items
    cy.get(".MuiDataGrid-row [type=checkbox]")
      .first()
      .check()
      .should("be.checked");

    cy.get(".MuiDataGrid-row [type=checkbox]")
      .last()
      .check()
      .should("be.checked");

    // Go to favorites
    cy.get("ul.nav-bar-list>li").eq(1).click();

    // Check number of favorites
    cy.get(".MuiDataGrid-row").should("have.length", 2);

    // Uncheck one favorite
    cy.get(".MuiDataGrid-row [type=checkbox]").last().uncheck();

    // Check number of favorites again
    cy.get(".MuiDataGrid-row").should("have.length", 1);

    // Go to the home
    cy.go("back");

    // Check states of the items
    cy.get(".MuiDataGrid-row [type=checkbox]").first().should("be.checked");

    cy.get(".MuiDataGrid-row [type=checkbox]").last().should("not.be.checked");
  });
});
