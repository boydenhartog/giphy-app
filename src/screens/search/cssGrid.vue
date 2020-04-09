<template>
  <div class="results-container">
    <Loader v-if="loading" />
    <div v-else class="grid-container">
      <div
        v-for="gif in gifs"
        :key="gif.id"
        class="grid-item"
        :style="`background-image: url(${gif.images.original.url})`"
      >
        <img :src="gif.images.original.url" v-on:load="onImgLoad" />
      </div>
      <!-- <div v-for="gifs in chunkedGifs" :key="gifs[0].slug" class="tile">
        <div v-for="gif in gifs" :key="gif.id" class="tile is-parent">
          
          :style="imgLoaded ? 'visibility: hidden' : 'visibility: visible'"
          :class="
          getImageClass(gif.images.original.height, gif.images.original.width)
        "
          
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
            
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DataResult } from "../../utils/giphyApiTypes";
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
  @Prop() gifs!: Array<DataResult>;
  imgLoaded = false;

  getImageClass(height: number, width: number): string {
    const ratio = this.getGreatestCommonDivisor(width, height);
    const widthAspect = width / ratio;
    const heightAspect = height / ratio;

    // console.log("vertical: ", widthAspect / heightAspect >= 1.7);
    // console.log("horizontal: ", widthAspect / heightAspect <= 0.5);
    // if (widthAspect / heightAspect >= 1.7) return "horizontal";
    // if (widthAspect / heightAspect <= 0.5) return "vertical";

    return "";
  }

  getGreatestCommonDivisor(a: number, b: number): number {
    return b === 0 ? a : this.getGreatestCommonDivisor(b, a % b);
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

  .sexygrid {
    background-color: "#333745";
    border-radius: 4px;
  }

  .grid-container {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(autofill, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    grid-auto-flow: dense;

    .grid-item {
      width: 100%;
      height: 100%;
      position: relative;
    }

    > img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      object-fit: cover;
    }

    .horizontal {
      grid-column: span 2;
      grid-row: span 1;
      justify-self: stretch;
    }

    .vertical {
      grid-column: span 1;
      grid-row: span 2;
      align-self: stretch;
    }

    .big {
      grid-column: span 2;
      grid-row: span 2;
    }
  }
}
</style>
