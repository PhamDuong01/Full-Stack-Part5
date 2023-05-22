describe('Blog app', function () {
  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
  });
  describe('Login', function () {
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

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('phamduong');
      cy.get('#password').type('phamduong');
      cy.get('.btnSubmit').click();
      cy.get('.noti').contains('Ryan Pham');
      cy.get('.btnLogout').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('phamduong');
      cy.get('#password').type('wrongpassword');
      cy.get('.btnSubmit').click();
      cy.contains('invalid username or password');
      cy.get('.noti.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
