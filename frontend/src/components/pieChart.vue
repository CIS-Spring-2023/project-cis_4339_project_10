<script>
// Import the Chart.js library and its required components
import { Chart, registerables } from 'chart.js'
// Register the Chart.js components
Chart.register(...registerables)

export default {
  // Define the component's props
  props: {
    label: {
      type: Array // define the 'label' prop as an array
    },
    chartData: {
      type: Array // define the 'chartData' prop as an array
    }
  },
  // Lifecycle hook: called when the component is mounted
  mounted() {
    // Generate random background colors for the chart
    const pieBackgroundColor = this.chartData.map(() => this.getColor())

    // Create a new Chart.js instance and render the doughnut chart
    new Chart(this.$refs.myChart, {
      type: 'doughnut', // specify the type of chart as doughnut
      data: {
        labels: this.label, // use the 'label' prop as chart labels
        datasets: [
          {
            data: this.chartData, // use the 'chartData' prop as chart data
            backgroundColor: pieBackgroundColor // use the generated colors as background colors
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true // enable the chart legend display
          }
        },
        responsive: true, // make the chart responsive
        maintainAspectRatio: false, // do not maintain the aspect ratio of the chart
      }
    });
  },

  // Define the component's methods
  methods: {
    // Method to generate random RGBA color
    getColor() {
      let channel = () => Math.random() * 255 // generate random values between 0 and 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)` // return an RGBA color string with the alpha value set to 0.2
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