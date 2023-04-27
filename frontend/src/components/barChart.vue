<script lang="js">
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  data() {
    // Create a reactive property to store the chart instance
    return {
      chartInstance: null
    };
  },
  computed: {
    chartConfig() {
      // Generate background colors for each bar
      const backgroundColor = this.chartData.map(() => this.getColor());
      // Generate border colors for each bar, using the same color but with full opacity
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      );
      // Return the chart configuration
      return {
        type: 'bar',
        data: {
          labels: this.label,
          datasets: [
            {
              borderWidth: 1,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: this.chartData
            }
          ]
        },
        options: {
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            },
            x: {
              gridLines: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          responsive: true,
          maintainAspectRatio: true,
        }
      };
    }
  },
  watch: {
    chartConfig: {
      handler(newConfig) {
        // If there is an existing chart instance, destroy it
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        // Render the chart with the new configuration
        this.renderChart(newConfig);
      },
      deep: true
    }
  },
  methods: {
    async renderChart(config) {
      // Wait for the next DOM update cycle
      await this.$nextTick();
      // Create a new chart instance with the given configuration
      this.chartInstance = new Chart(this.$refs.attendanceChart, config);
    },
    getColor() {
      // Generate a random color with 0.2 opacity
      let channel = () => Math.random() * 255;
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`;
    }
  }
}
</script>

<template>
  <!-- Only render the canvas element if there is data for the chart -->
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas v-if="chartData.length && label.length" class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
