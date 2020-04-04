<template>
  <div class="results-container">
    <Loader v-if="loading" />
    <div v-else v-for="gif in gifs" :key="gif.id" class="gif-container">
      <img :src="gif" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Loader from "../../components/loader.vue";

@Component({
  components: {
    Loader,
  },
})
export default class ResultGrid extends Vue {
  @Prop() loading = false;
  @Prop() gifs: Array<string> = [];
}
</script>

<style lang="scss" scoped>
.results-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

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
