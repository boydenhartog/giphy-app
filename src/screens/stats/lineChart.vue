<template>
  <LineChart class="chart" :data="prepareData()" :options="options" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";
import moment from "moment";
import LineChart from "../../components/lineChart";

interface SearchTermResult {
  id: number;
  term: string;
  created_at: string;
}

interface SearchTermWithDay extends SearchTermResult {
  date: string;
}

@Component({
  components: { LineChart }
})
export default class LineChartComponent extends Vue {
  @Prop() searchTerms!: Array<SearchTermResult>;
  topFiveSearchTerms = {};
  options = {
    legend: {
      display: false
    },
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

  countPerDay(searchTerms: Array<SearchTermResult>) {
    const searchTermsWithDay: Array<SearchTermWithDay> = [];

    searchTerms.reduce((acc, item) => {
      acc.push({
        ...item,
        date: moment(item.created_at).format("DD-MM-YYYY")
      });

      return acc;
    }, searchTermsWithDay);

    return searchTermsWithDay;
  }

  prepareData() {
    const termsWithDay = this.countPerDay(this.searchTerms);
    const countPerDay = _.countBy(termsWithDay, "date");
    const sortedPerDay = Object.entries(countPerDay).sort((a, b) => {
      const dateA = moment(a[0], "DD-MM-YYYY").unix();
      const dateB = moment(b[0], "DD-MM-YYYY").unix();
      return dateA - dateB;
    });

    const labels = sortedPerDay.map(set => set[0]);
    const data = sortedPerDay.map(set => set[1]);

    return {
      labels,
      datasets: [
        {
          label: "Searches per day",
          data
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped></style>
