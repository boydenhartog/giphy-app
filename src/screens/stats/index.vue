<template>
  <div class="stats-page container">
    <h2>Trending search terms</h2>

    <Chart
      v-if="SearchTerm.length > 0"
      class="chart"
      :data="prepareData()"
      :options="options"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import _ from "lodash";
import Chart from "../../components/chart";

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
  components: { Chart }
})
export default class Stats extends Vue {
  isLoading = true;
  results = {};
  SearchTerm = [];
  topFiveSearchTerms = {};
  options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  countAndSortResults(searchTerms: Array<SearchTermResult>) {
    const termCounts: { [key: string]: number } = _.countBy(
      searchTerms,
      "term"
    );
    const termCountsArray = Object.entries(termCounts);

    termCountsArray.sort((a, b) => {
      return b[1] - a[1];
    });

    return termCountsArray;
  }

  prepareData() {
    const topFive = this.countAndSortResults(this.SearchTerm).slice(0, 5);
    const labels = topFive.map(topFive => topFive[0]);
    const data = topFive.map(topFive => topFive[1]);

    return {
      labels,
      datasets: [
        {
          label: "# of searches",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
.stats-page {
  display: flex;
  flex-direction: column;
}
</style>
