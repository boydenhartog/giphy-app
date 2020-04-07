<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="tile is-ancestor is-vertical">
      <div v-for="gifs in chunkedGifs" :key="gifs[0].slug" class="tile">
        <div v-for="gif in gifs" :key="gif.id" class="tile is-parent">
          <div
            class="tile is-child box hvr-grow"
            @click="setActiveGif(gif.images.original.url)"
          >
            <img :src="gif.images.fixed_height_downsampled.url" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Loader from "../../components/loader.vue";
import _ from "lodash";

@Component({
  components: {
    Loader
  }
})
export default class ResultGrid extends Vue {
  @Prop() loading!: boolean;
  @Prop() gifs!: Array<object>;

  get chunkedGifs() {
    return _.chunk(this.gifs, 4);
  }

  setActiveGif(activeGif: string) {
    this.$emit("setActiveGif", activeGif);
  }

  onImgLoad() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.results-container {
  display: flex;
  margin-top: 30px;

  .loader-container {
    height: 300px;
    width: 300px;
  }

  .gif-container {
    height: 250px;
    width: 250px;
    margin: 10px;

    img {
      width: 100%;
      height: auto;
      margin: 8px;
    }
  }
}
</style>
