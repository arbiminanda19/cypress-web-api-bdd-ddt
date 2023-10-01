require("@cypress/xpath");
import * as objects from "./objects/page.js";
import { valid_login } from "./data/login.data.js";
import * as elements from "./helpers/element.js";

before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe("OrangeHR", () => {
  beforeEach(() => {
    cy.login(valid_login.username, valid_login.password);
  });

  it("Open Recruitment", () => {
    elements.click(objects.btn_recruitment);
  });

  it("Type Search", () => {
    cy.xpath(objects.input_search).type("Test");
  });
});
