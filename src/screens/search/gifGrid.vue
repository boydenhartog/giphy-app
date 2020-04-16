<template>
  <div class="results-container">
    <Loader v-if="loading" />
    <div v-else class="grid-container">
      <GridItem
        v-for="gif in gifs"
        :key="gif.id"
        :gif="gif"
        :height="gif.images.original.height"
        :width="gif.images.original.width"
        :url="gif.images.original.url"
        @setActiveGif="setActiveGif"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GiphyResult } from "../../utils/giphyApiTypes";
import Loader from "../../components/loader.vue";
import GridItem from "./gridItem.vue";

@Component({
  components: {
    Loader,
    GridItem
  }
})
export default class ResultGrid extends Vue {
  @Prop() loading!: boolean;
  @Prop() gifs!: Array<GiphyResult>;

  setActiveGif(activeGif: string) {
    this.$emit("setActiveGif", activeGif);
  }
}
</script>

<style lang="scss" scoped>
.results-container {
  margin-top: 30px;

  .grid-container {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-flow: dense;
  }
}

@media all and (max-width: 600px) {
  .results-container {
    margin-top: 8px;

    .grid-container {
      grid-gap: 8px;
    }
  }
}
</style>
