const { defineConfig } = require('cypress');
module.exports = defineConfig({
  projectId: '8zed6k',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: 'http://localhost:3003',
  },
});
