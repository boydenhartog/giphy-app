# giphy-app

Had a lot of fun on this one! First time trying CSS Grid and also my first time writing tests for a Vue app. 

Yarn is required to build this app. Get it here: https://github.com/yarnpkg/yarn

The backend is setup using Hasura (GraphQL/Postgres)

- To install, use `yarn install` 
- To run app: `yarn serve` 
- To run unit tests: `yarn test:unit` 
- To run e2e tests: `test:cypress` 

Create a .env file in the root folder and use these .env vars:

    VUE_APP_GIPHY_API_KEY=RyWYJB7klgCR9vwKyjyVDz4eAvoMcRIx
    VUE_APP_GIPHY_BASE_URL=https://api.giphy.com/v1
    VUE_APP_API_BASE_URL=https://giphy-app-be.herokuapp.com/v1/graphql


Known bugs:
- Buefy modal exiting hitbox is weird
- Buefy pagination (going to last page doesn't trigger a request)


Wishlist 
- Additional styling (different color scheme)
- Fix imports (need to add .vue for imports)
- Actually use SCSS variables :)


