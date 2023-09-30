require("@cypress/xpath");
import * as objects from "./objects/page.js";

before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe("OrangeHR", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
  });

  it("Open Recruitment", () => {
    cy.xpath(objects.btn_recruitment).click();
  });

  it("Type Search", () => {
    cy.xpath(objects.input_search).type("Test");
  });
});
