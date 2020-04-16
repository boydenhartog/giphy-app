describe("Search page", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      url: "**/v1/gifs/**",
      response: "fixture:getGiphies",
      delay: 200
    }).as("getGiphies");
    cy.route({
      url: "**/v1/graphql/",
      method: "POST",
      response: "fixture:postGraphql"
    }).as("postQuery");
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
    // Search and hit enter
    cy.get("[data-test-id=search-bar]")
      .type("boom")
      .type("{enter}");

    // Should show the loader
    cy.get("[data-test-id=loader]").should("be.visible");

    // When response is in, should show 12 gifs (mocked response)
    cy.wait("@getGiphies").then(() => {
      cy.get(".grid-item").should(gridItem => {
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

    // Loader should be visible
    cy.get("[data-test-id=loader]").should("be.visible");

    // When empty result is in, no items should be visible (mocked response)
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
});

// .find(".grid-item")
// .then(gridItem => {
//   const itemCount = Cypress.$(gridItem).length;
//   expect(gridItem).to.have.length(itemCount);
// });
// });

// it("should add a searchterm to the database when searching", () => {
//   cy.server();
//   cy.route({
//     method: "POST",
//     url: `${process.env.VUE_APP_API_BASE_URL}`
//   }).as("postSearchTerm");

//   const searchBar = "[data-test-id=search-bar]";
//   const searchQuery = "boom";

//   cy.visit("");

//   cy.get(searchBar)
//     .type(searchQuery)
//     .type("{enter}");

//   // Check response
//   cy.wait("@postSearchTerm").then(xhr => {
// assert.equal(xhr.status, 200);
// assert.equal(
//   xhr.response.data.insert_SearchTerm.returning[0].term,
//   searchQuery
// );
//   });

//   // `delete_SearchTerm(where: {id: {_eq: 317}}) {
//   //   returning {
//   //     term
//   //     id
//   //     created_at
//   //   }
//   // }`;
// });
