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

    <b-modal :active.sync="modalActive" :on-cancel="closeModal">
      <p class="image">
        <img :src="activeGif" class="modal-image" />
      </p>
    </b-modal>

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

    <ResultGrid
      @setActiveGif="openModal($event)"
      :loading="isLoading"
      :gifs="gifs"
    />

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
import { searchGifs } from "../../utils/giphyApi";
import { DataResult, Pagination } from "../../utils/giphyApiTypes";
import ResultGrid from "./resultGrid.vue";
import gql from "graphql-tag";

const ADD_SEARCH_TERM = gql`
  mutation MyMutation($term: String!) {
    insert_SearchTerm(objects: { term: $term }) {
      returning {
        created_at
        id
        term
      }
    }
  }
`;

@Component({
  components: {
    ResultGrid
  }
})
export default class Search extends Vue {
  isLoading = false;
  query = "";
  prevQuery = "";
  limit = 12;
  totalCount = 0;
  page = 1;
  gifs: Array<DataResult> = [];
  pagination!: Pagination;
  prevIcon = "chevron-left";
  nextIcon = "chevron-right";
  modalActive = false;
  activeGif = "";

  get totalPages() {
    return Math.floor(this.totalCount / this.limit);
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  openModal(gifUrl: string) {
    this.modalActive = true;
    this.activeGif = gifUrl;
  }

  closeModal() {
    this.modalActive = false;
    this.activeGif = "";
  }

  async search() {
    this.isLoading = true;

    if (this.query != this.prevQuery) this.createSearchTerm();
    this.prevQuery = this.query;

    const res = await searchGifs({
      query: this.query,
      offset: this.offset,
      limit: this.limit
    });

    this.gifs = res.data;
    this.pagination = res.pagination;
    this.totalCount = this.pagination.total_count;
    this.isLoading = false;
  }

  createSearchTerm() {
    this.$apollo.mutate({
      mutation: ADD_SEARCH_TERM,
      variables: {
        term: this.query
      }
    });
  }

  changePage(page: number) {
    this.page = page;
    this.search();
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

  .modal-image {
    max-height: 90vh;
    // max-width: 90vw;
  }
}
</style>
