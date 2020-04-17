<template>
  <div class="grid-item" @click="setActiveGif(url)" :class="ImageClass">
    <GifPlaceHolder
      data-testid="placeholder-comp"
      v-show="!imgLoaded"
      :height="height"
      :width="width"
    />
    <img
      v-show="imgLoaded"
      class="hvr-grow scale-in"
      :src="url"
      v-on:load="onImgLoad"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Loader from "../../components/loader.vue";
import GifPlaceHolder from "./gifPlaceholder.vue";

@Component({
  components: {
    Loader,
    GifPlaceHolder
  }
})
export default class GridItem extends Vue {
  @Prop() height!: number;
  @Prop() width!: number;
  @Prop() url!: string;
  imgLoaded = false;

  get ImageClass(): string {
    if (this.width / this.height >= 1.75) return "horizontal";
    if (this.height / this.width >= 1.5) return "vertical";
    if (this.height >= 350 && this.width >= 350) return "big";

    return "";
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
