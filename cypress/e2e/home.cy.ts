describe("Pokemons Page", () => {
  it("should redirect from '/' to '/pokemons' and display a list of pokemons", () => {
    cy.visit("/");
    cy.url().should("include", "/pokemons");
    cy.contains("Pokémon Cards").should("exist");
    cy.get('[data-cy="pokemon-card"]').should("have.length", 20);
  });

  it("should search for 'Charmander', click the first card, check its name, type, attacks, and close the modal", () => {
    cy.visit("/pokemons");

    cy.get('[data-cy="search-input"]').type("Charmander");
    cy.wait(500);

    cy.get('[data-cy="pokemon-card"]').first().click();
    cy.contains("Charmander").should("exist");

    cy.get('[data-cy="pokemon-type"]').should("contain.text", "Fire");
    cy.get('[data-cy="attack-item"]').should("have.length.greaterThan", 0);
    cy.get('[data-cy="attack-item"]').first().click();

    cy.get('[data-cy="attack-name"]').should("exist");
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="attack-name"]').should("not.exist");
  });
});
