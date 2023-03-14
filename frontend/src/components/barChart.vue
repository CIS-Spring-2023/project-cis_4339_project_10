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
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.attendanceChart, {
      //pie type
      type: 'pie',
      data: {
        //labels on the pie chart
        labels: ['Events', 'Attendees', 'Employees'],
        datasets: [
          {
            borderWidth: 2,
            //color of the pie chart
            backgroundColor: ['#28536B', '#C2948A', '#7EA8BE'],
            //the data inside the pie chart
            data: [60, 242, 20]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    })
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
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-5" ref="attendanceChart"></canvas>
  </div>
</template>