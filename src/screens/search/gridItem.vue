<template>
  <div class="grid-item" @click="setActiveGif(url)" :class="ImageClass">
    <PlaceHolder v-show="!imgLoaded" :height="height" :width="width" />
    <img v-show="imgLoaded" class="hvr-grow" :src="url" v-on:load="onImgLoad" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DataResult } from "../../utils/giphyApiTypes";
import Loader from "../../components/loader.vue";
import PlaceHolder from "./placeholder.vue";

@Component({
  components: {
    Loader,
    PlaceHolder
  }
})
export default class GridItem extends Vue {
  @Prop() gif!: DataResult;
  @Prop() height!: number;
  @Prop() width!: number;
  @Prop() url!: string;
  imgLoaded = false;

  get ImageClass(): string {
    const ratio = this.getGreatestCommonDivisor(this.width, this.height);
    const widthAspect = this.width / ratio;
    const heightAspect = this.height / ratio;

    if (widthAspect / heightAspect >= 1.75) return "horizontal";
    if (widthAspect / heightAspect <= 0.75) return "vertical";
    if (this.height > 425 || this.width > 425) return "big";

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
.grid-item {
  > img {
    border-radius: 4px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
  }
}
.horizontal {
  grid-column: span 2;
  grid-row: span 1;
}

.vertical {
  grid-column: span 1;
  grid-row: span 2;
}

.big {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
