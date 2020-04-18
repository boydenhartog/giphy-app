describe("Search page", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      url: "**/v1/gifs/**",
      response: "fixture:getGiphies",
      delay: 200
    }).as("getGiphies");
  });

  it("should show search page by default", () => {
    const firstTab = "nav.tabs > ul > :nth-child(1)";
    const secondTab = "nav.tabs > ul > :nth-child(2)";

    cy.visit("");

    cy.get(firstTab)
      .invoke("text")
      .should("contain", "Search");

    cy.get(firstTab).should("have.class", "is-active");

    cy.get(secondTab)
      .invoke("text")
      .should("contain", "Stats");

    cy.get(secondTab).should("not.have.class", "is-active");
  });

  it("should see a loader and giphies after searching succesfully", () => {
    // Use real API call for happy flow
    cy.route({
      url: "**/v1/gifs/**"
    }).as("getGiphies");

    // Search and hit enter
    cy.get("[data-test-id=search-bar]")
      .type("boom")
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // When response is in, should show 12 gifs (mocked response)
    cy.wait("@getGiphies").then(() => {
      cy.get(".grid-item").should(gridItem => {
        // Popular term for gifs, should always return > 12
        expect(gridItem).to.have.length(12);
      });
    });

    // Should not show loader when gifs are visible
    cy.get("[data-test-id=loader]").should("not.be.visible");
  });

  it("should show an empty result when no giphies are found", () => {
    const searchBar = "[data-test-id=search-bar]";
    const searchQuery = "ufcafafsdafsdafwweqr2qg1";

    cy.route({
      url: "**/v1/gifs/**",
      response: "fixture:getNoGiphies",
      delay: 200
    }).as("getNoGiphies");

    // Search and hit enter
    cy.get(searchBar)
      .type(searchQuery)
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // When empty result is in, no items should be visible
    cy.wait("@getNoGiphies").then(() => {
      cy.get(".grid-item").should(gridItem => {
        expect(gridItem).to.have.length(0);
      });
    });

    // Loader should be hidden
    cy.get("[data-test-id=loader]").should("not.be.visible");

    // No resuls notification should be visible
    cy.get(".media-content")
      .invoke("text")
      .should("contain", "Search yielded no results.");
  });

  it("should be able to open and close a modal with a giphy", () => {
    // Search and hit enter
    cy.get("[data-test-id=search-bar]")
      .type("boom")
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // Wait for results
    cy.wait("@getGiphies").then(() => {
      // Modal should not be visible
      expect(cy.get(".modal.is-active").should("not.be.visible"));

      // Click on gify
      cy.get(".grid-item")
        .first()
        .click();

      // Modal should be open
      expect(cy.get(".modal.is-active").should("be.visible"));

      // Close the modal and check if close-modal button is invisible
      cy.get(".modal-close")
        .click()
        .should("not.exist");

      // Modal should be closed
      expect(cy.get(".modal.is-active").should("not.be.visible"));
    });
  });

  it("should be able to go to the second page", () => {
    // Search and hit enter
    cy.get("[data-test-id=search-bar]")
      .type("boom")
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // Wait for results
    cy.wait("@getGiphies").then(() => {
      // Page 1 should be active
      cy.get("a.pagination-link")
        .eq(2)
        .should("have.class", "is-current")
        .invoke("text")
        .should("contain", 1);

      // Get page 2 (first two pagination-links are previous and next)
      cy.get("a.pagination-link")
        .eq(3)
        .click();

      cy.wait("@getGiphies").then(() => {
        // Page 2 should be active
        cy.get("a.pagination-link")
          .eq(3)
          .should("have.class", "is-current")
          .invoke("text")
          .should("contain", 2);
      });
    });
  });

  it("should show an error message on a bad request", () => {
    const searchBar = "[data-test-id=search-bar]";
    const searchQuery = "ufcafafsdafsdafwweqr2qg1";
    const error = new Error("Invalid API Key");

    cy.route({
      url: "**/v1/gifs/**",
      response: () => Promise.reject(error),
      delay: 200
    }).as("getGiphies");

    Cypress.on("fail", error => {
      // We are expecting this error to be thrown, do not fail the test
      if (error.message === "Invalid API Key") {
        return false;
      }

      throw error; // throw error to have test still fail
    });

    // Search and hit enter
    cy.get(searchBar)
      .type(searchQuery)
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // On bad response, no giphies should be shown
    cy.wait("@getNoGiphies").then(() => {
      expect().to.throw(error);
    });

    cy.get(".grid-item").should(gridItem => {
      expect(gridItem).to.have.length(0);
    });

    // Loader should be hidden
    cy.get("[data-test-id=loader]").should("not.be.visible");

    // No resuls notification should be visible
    cy.get(".media-content")
      .invoke("text")
      .should("contain", "Something went wrong.");
  });
});
