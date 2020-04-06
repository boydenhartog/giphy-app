<template>
  <div class="stats-page">
    <b-button type="button" @click="getStats">
      Go
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getTrending } from "../../utils/giphyApi";

@Component({})
export default class Stats extends Vue {
  isLoading = true;
  results = {};

  async getStats() {
    const res = await getTrending();
    this.results = res.data;
    this.isLoading = false;
  }
}
</script>

<style lang="scss" scoped>
.stats-page {
  display: flex;
}
</style>
