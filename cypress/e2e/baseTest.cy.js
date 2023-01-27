require("@cypress/xpath");
import { baseUrlWeb } from "./config/env.js";
import * as objects from "./objects/page.js";

before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe("OrangeHR", () => {
  beforeEach(() => {
    cy.visit(baseUrlWeb);
    cy.get(objects.input_username).type("Admin");
    cy.xpath(objects.input_password).type("admin123");
    cy.xpath(objects.btn_submit).click();
    cy.xpath(objects.img_logo).should("be.visible");
  });

  it("Open Recruitment", () => {
    cy.xpath(objects.btn_recruitment).click();
  });

  it("Type Search", () => {
    cy.xpath(objects.input_search).type("Test");
  });
});
