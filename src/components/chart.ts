import { Bar } from "vue-chartjs";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  extends: Bar,
})
export default class BarChart extends Vue {
  @Prop({ default: null }) data!: Record<string, any>;
  @Prop({ default: null }) options!: Record<string, any>;
  renderChart: any;

  mounted() {
    this.renderChart(this.data, this.options);
  }
}
