describe('Login Test', () => {
    it('should log in successfully with valid credentials', () => {
      cy.visit('http://localhost:5173/signin');
  
      cy.get('input[id="email"]').type('artiste@artiste.fr');
      cy.get('input[id="password"]').type('artiste1111');
  
      cy.get('button[type="button"]').click();
  
      cy.url().should('include', '/userpage');
    });
  
    it('should show an error message with invalid credentials', () => {
      cy.visit('http://localhost:5173/signin');
  
      cy.get('input[id="email"]').type('invalid@user.com');
      cy.get('input[id="password"]').type('invalidpassword');
  
      cy.get('button[type="button"]').click();
  
      cy.contains('Email ou mot de passe incorrect.');
    }); 
  });

