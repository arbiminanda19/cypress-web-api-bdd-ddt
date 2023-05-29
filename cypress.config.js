const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: "cypress/support/e2e",
    supportFile: false,
  },
  env: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    baseUrlAPI: "https://api.cicle.app/api/v1",
  },
});
