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
    return {
      chartInstance: null
    };
  },
  computed: {
    chartConfig() {
      const backgroundColor = this.chartData.map(() => this.getColor());
      const borderColor = backgroundColor.map((e) =>
        e.replace(/[\d\.]+\)$/g, '1)')
      );
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
              display: true
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
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.renderChart(newConfig);
      },
      deep: true
    }
  },
  methods: {
    async renderChart(config) {
      await this.$nextTick();
      this.chartInstance = new Chart(this.$refs.attendanceChart, config);
    },
    getColor() {
      let channel = () => Math.random() * 255;
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`;
    }
  }
}
</script>

<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas v-if="chartData.length && label.length" class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
