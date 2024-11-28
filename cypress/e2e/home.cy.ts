describe("Pokemons Page", () => {
  it("should load the home page", () => {
    cy.visit("/pokemons");
    cy.contains("Pokémon Cards");
  });
});
