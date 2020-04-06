import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "./assets/styles/mystyles.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueProgressiveImage from "vue-progressive-image";

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


Vue.use(VueProgressiveImage);

Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.use(Buefy, { defaultIconComponent: "vue-fontawesome" });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
