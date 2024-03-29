<script>
// Import necessary modules and components
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './barChart.vue'
import ClientChart from './pieChart.vue'
import { useLoggedInUserStore } from '@/store/loggedInUser';

// Retrieve the root API URL from environment variables
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  // Define components used in the template
  components: {
    AttendanceChart,
    ClientChart
  },
  // Define data properties used in the template
  data() {
    return {
      recentEvents: [], // Stores an array of events retrieved from the API
      labels: [], // Stores an array of labels to be used in the bar chart
      chartData: [], // Stores an array of data to be used in the bar chart
      loading: false, // Controls the display of a loading animation
      pieLoading: false, // Controls the display of a loading animation for the pie chart
      error: null, // Stores an error message, if an error occurs
      pielabels: [], // Stores an array of labels to be used in the pie chart
      pieData: [] // Stores an array of data to be used in the pie chart
    }
  },
  // Define the user variable that is used in the template
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  // Call the methods to retrieve data from the API when the component is mounted
  mounted() {
    this.getAttendanceData()
    this.clientByZip()
  },
  // Define computed properties used in the template
  computed: {
    upcomingEvents() {
      const today = DateTime.now().toISODate();
      return this.recentEvents.filter((event) => {
        const eventDate = DateTime.fromISO(event.date).toISODate();
        return eventDate >= today;
      });
    },
  },
  // Define methods used in the template
  methods: {
    // Method to retrieve event data from the API
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
        // Handle different types of errors that may occur when making the API call
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
      // Set loading to false to hide the loading animation
      this.loading = false
    },

    // Method to retrieve client data by zip code from the API
    async clientByZip() {
      try {
        const res = await axios.get(`${apiURL}/clients/zip`)
        this.pieLoading = true
        this.pielabels = res.data.map((zip) => zip._id)
        this.pieData = res.data.map((num) => num.count)
        console.log(this.pielabels)
      } catch (err) {
        console.log(err)
      }
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
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Welcome
      </h1>
      <br />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Event Address</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr @click="(user.role === 'editor') ? editEvent(event._id) : null" v-for="event in recentEvents"
                :key="event._id">

                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.address.line1 }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <AttendanceChart :label="labels" :chart-data="chartData"></AttendanceChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
          </div>

          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Zip Code</th>
                <th class="p-4 text-left">Number of Clients</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr v-for="zips, i in pielabels">
                <td class="p-2 text-left">{{ zips }}</td>
                <td class="p-2 text-left">{{ pieData[i] }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <ClientChart v-if="pieLoading" :label="pielabels" :chart-data="pieData">
            </ClientChart>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>
