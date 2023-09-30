const cucumber = require("cypress-cucumber-preprocessor").default;
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/support/e2e",
    supportFile: "cypress/support/commands.js",
  },
  env: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    baseUrlAPI: "https://api.cicle.app/api/v1",
  },
});
