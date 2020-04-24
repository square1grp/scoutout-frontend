import { Line } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Line,
  props: {
    histories: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    options: {
      responsive: true,
      steppedLine: true,
      maintainAspectRatio: false
    }
  }),
  methods: {
    getChartData() {
      const labels = this.histories.map(history =>
        moment(history.created).format("L")
      );
      const data = this.histories.map(history => history.price);

      return {
        labels: labels,
        datasets: [
          {
            label: "Price History",
            backgroundColor: "transparent",
            data: data,
            borderColor: "rgb(75, 192, 192)",
            steppedLine: true
          }
        ]
      };
    }
  },
  mounted() {
    this.renderChart(this.getChartData(), this.options);
  }
};