import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
require("@cypress/xpath");
import * as objects from "../../web/objects/page.js";

Given("user on login page", () => {
  cy.visit(Cypress.env("baseUrl"));
});

When("user input {string} as username", (username) => {
  cy.get(objects.input_username).type(username);
});

And("user input {string} as password", (password) => {
  cy.xpath(objects.input_password).type(password);
});

And("user click submit button", () => {
  cy.xpath(objects.btn_submit).click();
});

Then("user verify status login result", () => {
  cy.xpath(objects.img_logo).should("be.visible");
});
