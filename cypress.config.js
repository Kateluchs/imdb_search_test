const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.imdb.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
