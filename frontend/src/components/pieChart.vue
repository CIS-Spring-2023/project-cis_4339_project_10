<script>
// Import the Chart.js library and its required components
import { Chart, registerables } from 'chart.js'
// Register the Chart.js components
Chart.register(...registerables)

export default {
  // Define the component's props
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  // Lifecycle hook: called when the component is mounted
  mounted() {
    // Generate random background colors for the chart
    const pieBackgroundColor = this.chartData.map(() => this.getColor())

    // Create a new Chart.js instance and render the doughnut chart
    new Chart(this.$refs.myChart, {
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
        maintainAspectRatio: false,
      }
    });
  },

  // Define the component's methods
  methods: {
    // Method to generate random RGBA color
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>

<template>
  <!-- Define the component's template -->
  <div class="shadow-lg rounded-lg h-96">
    <!-- Create a canvas element for the Chart.js instance -->
    <canvas class="p-15" ref="myChart"></canvas>
  </div>
</template>
