<template>
  <div class="stats-page columns">
    <div class="column">
      <h1>Trending search terms</h1>
      <Loader v-if="$apollo.loading" />
      <BarChart v-else :searchTerms="SearchTerm" />
    </div>
    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import Loader from "../../components/loader.vue";

import BarChart from "./barChart.vue";

interface SearchTermResult {
  id: number;
  term: string;
  created_at: string;
}

const GET_SEARCH_TERMS = gql`
  query getSearchTerms {
    SearchTerm {
      id
      term
      created_at
    }
  }
`;

@Component({
  apollo: {
    SearchTerm: {
      query: GET_SEARCH_TERMS
    }
  },
  components: { BarChart, Loader }
})
export default class Stats extends Vue {
  isLoading = true;
  SearchTerm = [];
}
</script>

<style lang="scss" scoped>
.stats-page {
  display: flex;
}
</style>
