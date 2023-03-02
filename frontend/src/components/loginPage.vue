<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './barChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components: {
    AttendanceChart
  },
  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.getAttendanceData()
  },
  methods: {
    async getAttendanceData() {
      try {
        this.error = null
        this.loading = true
        const response = await axios.get(`${apiURL}/events/attendance`)
        this.recentEvents = response.data
        this.labels = response.data.map(
          (item) => `${item.name} (${this.formattedDate(item.date)})`
        )
        this.chartData = response.data.map((item) => item.attendees.length)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  }
}
</script>

<template>
<div class="form-container">
    <form @submit.prevent="submitForm">
      <label for="username">Username: </label>
      <input type="text" id="username" v-model="username" required>
      <br><br>
      <label for="password">Password: </label>
      <input type="password" id="password" v-model="password" required>
      <br><br>
      <button type="submit" class="bg-red-700 text-white rounded" >Login</button>
    </form>
  </div>
</template>
