import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "./assets/styles/mystyles.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";

import {
  faAngleRight,
  faArrowUp,
  faAngleLeft,
  faChevronRight,
  faStar,
  faCalendarAlt,
  faPalette,
  faSearch,
  faChartLine,
  faCat
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngleRight,
  faArrowUp,
  faAngleLeft,
  faChevronRight,
  faStar,
  faCalendarAlt,
  faPalette,
  faSearch,
  faChartLine,
  faCat
);

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const httpLink = new HttpLink({
  uri: API_BASE_URL,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.use(Buefy, { defaultIconComponent: "vue-fontawesome" });


Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
