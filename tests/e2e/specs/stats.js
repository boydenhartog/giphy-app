describe("Stats page", () => {
  it("should show two graphs", () => {
    const secondTab = "nav.tabs > ul > :nth-child(2)";
    cy.visit("");

    cy.get(secondTab).click();

    // Cypress can't see GraphQL requests because they are xhr so we cannot wait for it
    cy.wait(3000);

    cy.get("canvas#bar-chart").should("be.visible");
    cy.get("canvas#line-chart").should("be.visible");
  });
});
