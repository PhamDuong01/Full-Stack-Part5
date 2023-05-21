describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Ryan Pham',
      username: 'phamduong',
      password: 'phamduong',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2023');
  });

  it('login form can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in').click();
  });
});
