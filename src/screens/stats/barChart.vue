<template>
  <BarChart class="chart" :data="prepareData()" :options="options" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";
import BarChart from "../../components/barChart";

interface SearchTermResult {
  id: number;
  term: string;
  created_at: string;
}
@Component({
  components: { BarChart }
})
export default class Stats extends Vue {
  @Prop() searchTerms!: Array<SearchTermResult>;
  topFiveSearchTerms = {};
  options = {
    legend: {
      display: false
    },
    defaultFontFamily: "Avenir",
    defaultFontColor: "#2c3e50",
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
    const topFive = this.countAndSortResults(this.searchTerms).slice(0, 5);
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

<style lang="scss" scoped></style>
