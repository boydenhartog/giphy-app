import { Line } from "vue-chartjs";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  extends: Line
})
export default class LineChart extends Vue {
  @Prop({ default: null }) data!: Record<string, any>;
  @Prop({ default: null }) options!: Record<string, any>;
  renderChart: any;

  mounted() {
    this.renderChart(this.data, this.options);
  }
}
