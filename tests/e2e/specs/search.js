import { assertAbstractType } from "graphql";

describe("Search page", () => {
  it("should have the search tab active and stats tab inactive on the home page", () => {
    const firstTab = "nav.tabs > ul > :nth-child(1)";
    const firstTabTitle = "Search";
    const secondTab = "nav.tabs > ul > :nth-child(2)";
    const secondTabTitle = "Stats";

    cy.visit("");

    cy.get(firstTab)
      .invoke("text")
      .should("contain", firstTabTitle);
    cy.get(firstTab).should("have.class", "is-active");

    cy.get(secondTab)
      .invoke("text")
      .should("contain", secondTabTitle);
    cy.get(secondTab).should("not.have.class", "is-active");
  });

  it("should send a GET request to giphy when searching", () => {
    const searchBar = "[data-test-id=search-bar]";
    const searchQuery = "boom";

    cy.server();
    cy.route("**/v1/gifs/**", "fixture:getGiphies").as("getGiphies");

    cy.visit("");

    cy.get(searchBar)
      .type(searchQuery)
      .type("{enter}");

    cy.wait("@getGiphies").then(xhr => {
      assert.equal(xhr.status, 200);
    });

    cy.get("img").should();
  });

  it("should add a searchterm to the database when searching", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: `${process.env.VUE_APP_API_BASE_URL}`
    }).as("postSearchTerm");

    const searchBar = "[data-test-id=search-bar]";
    const searchQuery = "boom";

    cy.visit("");

    cy.get(searchBar)
      .type(searchQuery)
      .type("{enter}");

    // Check response
    cy.wait("@postSearchTerm").then(xhr => {
      assert.equal(xhr.status, 200);
      assert.equal(
        xhr.response.data.insert_SearchTerm.returning[0].term,
        searchQuery
      );
    });

    // `delete_SearchTerm(where: {id: {_eq: 317}}) {
    //   returning {
    //     term
    //     id
    //     created_at
    //   }
    // }`;
  });
});
