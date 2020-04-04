<template>
  <div class="hello">

    <input v-model="query" />
    <button @click="search">Search</button>

    <div>
      {{ results }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import giphyApi from "../../utils/giphyApi";

@Component
export default class Search extends Vue {
  @Prop() private msg!: string;

  isSearching = false;
  query = "";
  results = {};

  async search() {
    this.results = await giphyApi(this.query);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
