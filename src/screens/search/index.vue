<template>
  <div class="search-page">
    <div class="search-group">
      <input class="search" v-model="query" />
      <button @click="search">Search</button>
    </div>
    <div class="pagination-container">
      <button @click="setOffset(offset - 1)" :disabled="offset === 0">
        Previous
      </button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button @click="setOffset(offset + 1)">Next</button>
    </div>

    <ResultGrid :loading="isLoading" :gifs="gifs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import giphyApi, { DataResult, Pagination } from "../../utils/giphyApi";
import ResultGrid from "./resultGrid.vue";

@Component({
  components: {
    ResultGrid,
  },
})
export default class Search extends Vue {
  isLoading = false;
  query = "";
  offset = 0;
  limit = 6;
  results: Array<DataResult> = [];
  pagination?: Pagination = undefined;
  gifs: Array<string> = [];

  async search() {
    this.isLoading = true;
    const res = await giphyApi({
      query: this.query,
      offset: this.offset,
      limit: this.limit
    });
    this.results = res.data;
    this.pagination = res.pagination;
    this.buildGifs();
    this.isLoading = false;
  }

  buildGifs() {
    this.gifs = this.results
      .map((gif: DataResult) => gif.id)
      .map((gifId) => {
        return `https://media.giphy.com/media/${gifId}/giphy.gif`;
      });
  }

  setOffset(offset: number) {
    if (offset >= 0) {
      this.offset = offset;
      this.search();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;

  .search-group {
    display: flex;
    align-items: center;

    .search {
      height: 50px;
      border-radius: 4px;
      border: 1px solid #42b983;
      flex: 1;
      margin-right: 4px;

      &:focus {
        border: 2px solid #42b983;
        outline: #42b983;
      }
    }

    button {
      background-color: #42b983;
      height: 50px;
      width: 100px;
      border-radius: 4px;
      border: 0;
      flex: 0;
      color: white;
      font-size: 16px;
    }
  }
  .results {
  }
}
</style>
