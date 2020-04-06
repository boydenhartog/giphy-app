<template>
  <div id="app">
    <div class="container">
      <b-tabs position="is-centered">
        <b-tab-item label="Search" icon="search" icon-pack="fa">
          <Search />
        </b-tab-item>
        <b-tab-item label="Stats" icon="chart-line" icon-pack="fa">
          <Stats />
        </b-tab-item>
        <b-tab-item label="Tinder" icon="cat" icon-pack="fa"></b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "./screens/search/index.vue";
import Stats from "./screens/stats/index.vue";

@Component({
  components: {
    Search,
    Stats
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
