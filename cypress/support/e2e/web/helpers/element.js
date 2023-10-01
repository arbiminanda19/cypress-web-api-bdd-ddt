export function click(selector) {
  cy.xpath(selector).click();
}
