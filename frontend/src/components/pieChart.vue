<script>
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
  mounted() {
    const pieBackgroundColor = this.chartData.map(() => this.getColor())

    new Chart(this.$refs.pieChart, {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: pieBackgroundColor
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
    );
  },

  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
<template>
  <div class="shadow-lg rounded-lg h-96">
    <canvas class="p-15" ref="pieChart"></canvas>
  </div>
</template>