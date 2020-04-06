<template>
  <div class="stats-page columns">
    <div class="column">
      <h2>Trending search terms</h2>

      <Chart
        v-if="SearchTerm.length > 0"
        class="chart"
        :data="preparedData()"
        :options="options"
      />
    </div>
    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gql from "graphql-tag";
import _ from "lodash";
import Chart from "../../components/chart";

const countResults = (object: object) => {
  const termCounts = _.countBy(object, "term");
  const sortable = [];
  for (const termCount in termCounts) {
    sortable.push([termCount, termCounts[termCount]]);
  }

  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });

  const objSorted = {};
  sortable.forEach(function(item) {
    objSorted[item[0]] = item[1];
  });

  return objSorted;
};

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

  getTopFiveSearchTerms() {
    console.log("this.SearchTerm: ", this.SearchTerm);
    const sortedSearchTerms = countResults(this.SearchTerm);
    console.log("sortedSearchTerms: ", sortedSearchTerms);
    return _.take(sortedSearchTerms, 5);
  }

  preparedData() {
    const topFive = this.getTopFiveSearchTerms();
    const labels = Object.keys(topFive);
    console.log(labels);
    const data = Object.values(topFive);
    console.log(data);
    return {
      labels,
      datasets: [
        {
          label: "# of searches",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
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
  flex-direction: row;
}
</style>
