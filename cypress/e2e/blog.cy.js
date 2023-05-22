Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(`${password}{enter}`);
  cy.get('#btnSubmit').click();
});
Cypress.Commands.add('createBlog', (title, author, url) => {
  cy.get('#btnCreateNewBlog').click();
  cy.get('#title').type(title);
  cy.get('#author').type(author);
  cy.get('#url').type(url);
  cy.get('form').submit();
});

describe('Blog app', function () {
  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
  });
  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      const users = [
        {
          name: 'user1',
          username: 'user1',
          password: 'password',
        },
        {
          name: 'user2',
          username: 'user2',
          password: 'password',
        },
      ];
      users.forEach(function (user) {
        cy.request('POST', 'http://localhost:3003/api/users/', user);
      });
      cy.visit('http://localhost:3000');
    });
    it('succeeds with correct credentials', function () {
      cy.login('user1', 'password');
      cy.get('.noti').contains('user1');
    });

    it('fails with wrong credentials', function () {
      cy.login('user1', 'wrongpassword');
      cy.contains('invalid username or password');
      cy.get('.noti.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
      cy.login('user1', 'password');
    });
    it('A blog can be created', function () {
      const blog = {
        title: 'New blog title',
        author: 'Author of the new blog',
        url: 'blog url',
      };

      cy.createBlog(blog.title, blog.author, blog.url);

      cy.get('.blog-item').contains(blog.title);
      cy.get('.btn-Logout').click();
    });
    it('A blog can be liked', function () {
      cy.get('.show-detail').click();
      let currentLike;
      cy.get('.like-Number')
        .invoke('text')
        .then((value) => (currentLike = parseInt(value)));
      cy.get('.btn-Like').click();
      cy.get('.like-Number')
        .invoke('text')
        .then((value) => {
          expect(parseInt(value)).to.equal(currentLike + 1);
        });
      cy.get('.btn-Logout').click();
    });
    it('A blog only be removed by creator', function () {
      cy.get('.blog-item')
        .eq(0)
        .then(() => {
          cy.get('.show-detail').click();
          cy.get('.btn-Remove').click();
        });
      cy.contains('removed successfully');
    });
    it('only the creator can see the delete button of a blog', function () {
      const blog = {
        title: 'only the creator can see the delete button of a blog',
        author: 'Author',
        url: 'blog url',
      };

      cy.createBlog(blog.title, blog.author, blog.url);
      cy.get('.blog-item');
      cy.get('.btn-Logout').click();

      cy.login('user2', 'password');
      cy.get('.show-detail').click();
      cy.get('.blog-item').find('.btn-Remove').should('not.exist');
      cy.get('.btn-Logout').click();

      cy.login('user1', 'password');
      cy.get('.show-detail').click();
      cy.get('.blog-item').find('.btn-Remove').should('exist');
    });
  });
});
