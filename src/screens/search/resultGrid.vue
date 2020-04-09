<template>
  <div class="results-container">
    <Loader v-if="loading" />
    <div v-else class="tile is-ancestor is-vertical">
      <div v-for="gifs in chunkedGifs" :key="gifs[0].slug" class="tile">
        <div v-for="gif in gifs" :key="gif.id" class="tile is-parent">
          <div
            class="tile is-child hvr-grow"
            @click="setActiveGif(gif.images.original.url)"
          >
            <PlaceHolder
              v-if="!imgLoaded"
              :height="gif.images.original.height"
              :width="gif.images.original.width"
              class="placeholder"
            />
            <img
              :class="imgLoaded ? 'imgVisible' : 'imgHidden'"
              :src="gif.images.original.url"
              v-on:load="onImgLoad"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Loader from "../../components/loader.vue";
import PlaceHolder from "./placeholder.vue";
import _ from "lodash";

@Component({
  components: {
    Loader,
    PlaceHolder
  }
})
export default class ResultGrid extends Vue {
  @Prop() loading!: boolean;
  @Prop() gifs!: Array<object>;
  imgLoaded = false;

  get chunkedGifs() {
    return _.chunk(this.gifs, 4);
  }

  setActiveGif(activeGif: string) {
    this.$emit("setActiveGif", activeGif);
  }

  onImgLoad() {
    this.imgLoaded = true;
  }
}
</script>

<style lang="scss" scoped>
.results-container {
  margin-top: 30px;

  .loader-container {
    height: 300px;
    width: 300px;
  }

  img.imgVisible {
    visibility: visible;
  }

  img.imgHidden {
    visibility: hidden;
  }

  // .gif-container {
  //   height: 250px;
  //   width: 250px;
  //   margin: 10px;

  //   img {
  //     width: 100%;
  //     height: auto;
  //     margin: 8px;
  //   }
  // }
}
</style>
