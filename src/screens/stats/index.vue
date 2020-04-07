<template>
  <div>
    <Loader v-if="$apollo.loading" />
    <div v-else class="columns">
      <div class="column">
        <h1>Trending search terms</h1>
        <BarChart :searchTerms="SearchTerm" />
      </div>
      <div class="column">
        <h1>Searches per day</h1>
        <LineChart :searchTerms="SearchTerm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import Loader from "../../components/loader.vue";
import LineChart from "./lineChart.vue";
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
  components: { BarChart, LineChart, Loader }
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
