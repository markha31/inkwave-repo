describe('Login Test', () => {
  it('should log in successfully with valid credentials', () => {

    // Visit the signin page
    cy.visit('http://localhost:5173/signin');

    // Fill out the signin form
    cy.get('input[id="email"]').type('artiste@artiste.fr');
    cy.get('input[id="password"]').type('artiste1111');

    // Submit the form
    cy.get('button[type="button"]').click();

    // Verify that the login was successful
    cy.url().should('include', '/userpage');
    cy.contains('Welcome back');
  });

  it('should show an error message with invalid credentials', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/signin');

    // Fill out the login form with invalid credentials
    cy.get('input[id="email"]').type('1111');
    cy.get('input[id="password"]').type('password');

    // Submit the form
    cy.get('button[type="button"]').click();

    // Verify that an error message is shown
    cy.contains('Invalid email or password');
  });
});

