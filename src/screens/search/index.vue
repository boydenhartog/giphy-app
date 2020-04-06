<template>
  <div class="search-page">
    <div class="search-group">
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          icon-pack="fas"
          icon-right="search"
          v-model="query"
          @icon-click="search"
          @keyup.native.enter="search"
        >
        </b-input>
      </b-field>
    </div>

    <b-pagination
      :total="totalCount"
      :current="page"
      :range-before="3"
      :range-after="1"
      @change="changePage"
      :per-page="limit"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      icon-pack="fa"
    />

    <ResultGrid :loading="isLoading" :gifs="gifs" />

    <b-pagination
      v-if="totalCount > limit"
      :total="totalCount"
      :current="page"
      :range-before="3"
      :range-after="1"
      @change="changePage"
      :per-page="limit"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      icon-pack="fa"
      class="bottom-pagination"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { searchGifs, DataResult, Pagination } from "../../utils/giphyApi";
import ResultGrid from "./resultGrid.vue";

interface BuiltGif extends DataResult {
  buildUrl: string;
}

@Component({
  components: {
    ResultGrid,
  },
})
export default class Search extends Vue {
  isLoading = false;
  query = "";
  limit = 12;
  totalCount = 0;
  page = 1;
  results: Array<DataResult> = [];
  pagination?: Pagination = undefined;
  gifs: Array<BuiltGif> = [];
  prevIcon = "chevron-left";
  nextIcon = "chevron-right";

  get totalPages() {
    return Math.floor(this.totalCount / this.limit);
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  async search() {
    this.isLoading = true;
    const res = await searchGifs({
      query: this.query,
      offset: this.offset,
      limit: this.limit,
    });
    this.results = res.data;
    this.pagination = res.pagination;
    this.totalCount = this.pagination.total_count;
    this.buildGifs();
    this.isLoading = false;
  }

  changePage(page: number) {
    this.page = page;
    this.search();
  }

  buildGifs() {
    this.gifs = this.results.map((gif: DataResult) => {
      return {
        ...gif,
        buildUrl: `https://media.giphy.com/media/${gif.id}/giphy.gif`,
      };
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-page {
  .search-group {
    margin-bottom: 30px;
  }

  .bottom-pagination {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
