require("@cypress/xpath");
import * as objects from "./objects/page.js";
const neatCSV = require("neat-csv");

let table;

before(() => {
  cy.config("defaultCommandTimeout", 20000);
  cy.fixture("test_data.csv")
    .then(neatCSV)
    .then((data) => {
      table = data;
    })
    .then(console.table);
});

describe("OrangeHR", () => {
  it("Login with Test Data", () => {
    table.forEach((userData) => {
      cy.visit(Cypress.env("baseUrl"));
      cy.get(objects.input_username).type(userData.username);
      cy.xpath(objects.input_password).type(userData.password);
      cy.xpath(objects.btn_submit).click();
      cy.xpath(objects.img_logo).should("be.visible");
      cy.clearLocalStorage();
    });
  });
});
