<template>
  <div
    class="placeholder"
    :style="`height: ${height}px; width: ${width}px`"
  ></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  @Prop() height!: number;
  @Prop() width!: number;
}
</script>

<style lang="scss">
.placeholder {
  background-color: "#C7EFCF";
  border-radius: 4px;
}
</style>
