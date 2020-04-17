<template>
  <div class="search-page">
    <div class="search-group">
      <b-field>
        <b-input
          data-test-id="search-bar"
          placeholder="Search..."
          type="search"
          autofocus
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
      <img :src="activeGif" alt="image" />
    </b-modal>

    <b-pagination
      v-if="totalCount > limit && !noResults && !error"
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

    <b-message v-if="noResults" type="is-info">
      Search yielded no results.
    </b-message>

    <b-message v-if="error" type="is-danger">
      Something went wrong.
    </b-message>

    <GifGrid
      @setActiveGif="openModal($event)"
      :loading="isLoading"
      :gifs="gifs"
    />

    <b-pagination
      v-if="totalCount > limit && !noResults && !error"
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
import { searchGifs } from "@/utils/giphyApi";
import { GiphyResult } from "@/utils/giphyApiTypes";
import GifGrid from "./gifGrid.vue";
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
    GifGrid
  }
})
export default class Search extends Vue {
  isLoading = false;
  query = "";
  prevQuery = "";
  limit = 12;
  totalCount = 0;
  page = 1;
  gifs: Array<GiphyResult> = [];
  prevIcon = "chevron-left";
  nextIcon = "chevron-right";
  modalActive = false;
  activeGif = "";
  noResults = false;
  error = "";

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

    if (this.query != this.prevQuery) {
      this.createSearchTerm();
      this.page = 1;
    }

    this.prevQuery = this.query;

    try {
      const res = await this.getGiphies();
      this.gifs = res.data;
      this.totalCount = res.pagination?.total_count ?? 0;
      this.noResults = this.totalCount === 0;
      this.isLoading = false;
    } catch (error) {
      this.error = error;
      this.isLoading = false;
    }
  }

  getGiphies() {
    return searchGifs({
      query: this.query,
      offset: this.offset,
      limit: this.limit
    });
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
    max-width: 75vw;
    width: auto;
    justify-self: center;
    margin: auto;
  }
}
@media all and (max-width: 600px) {
  .search-group {
    margin-bottom: 8px;
  }
  .bottom-pagination {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
