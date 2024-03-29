<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import { useLoggedInUserStore } from '@/store/loggedInUser';
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      newService: {
        name: '',
        description: '',
        status: false,
      },
      events: [
        {
          services: [
            {
              _id: '',
              name: '',
            }
          ]
        }
      ],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      eventDate: '',
      services: [
        {
          _id: ''
        }
      ], // define the services array
    };
  },
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  methods: {
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Event Name') {
        endpoint = `events/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Event Date') {
        endpoint = `events/search/?eventDate=${this.eventDate}&searchBy=date`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.events = res.data
      })
    },
    async getEvents() {
    try {
    console.log("Fetching services...")
    const response = await axios.get(`${apiURL}/services`);
    console.log("Services fetched!",response)
    
    console.log("Filtering active services...")
    this.services = response.data
      .filter(service => service.status === 'Active')
      .map(service => ({ _id: service._id, name: service.name }));
    console.log("Active services filtered!",this.services)
    
    console.log("Fetching events...")
    const response1 = await axios.get(`${apiURL}/events`);
    console.log("Events fetched!",response1)
    
    this.events = response1.data;

    console.log("Mapping event services...")
    this.events.forEach((event) => {
      const eventServices = this.services.filter(
        (service) => event.services.some((s) => s._id === service._id)
      );

      if (eventServices.length > 0) {
        event.services = eventServices.map((service) => ({
          _id: service._id,
          name: service.name,
          eventName: event.name
        }));
      }
    });
  } catch (error) {
    console.error(error);
  }
},
    
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.eventDate = ''

      this.getEvents()
    },
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  },
  created() {
    this.getEvents();
  },
}
</script>

<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        List of Events
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Search Event By</h2>
        <!-- Displays Client Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy">
            <option value="Event Name">Event Name</option>
            <option value="Event Date">Event Date</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Event Name'">
          <label class="block">
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name" v-on:keyup.enter="handleSubmitForm" placeholder="Enter event name" />
          </label>
        </div>
        <!-- Displays event date search field -->
        <div class="flex flex-col" v-if="searchBy === 'Event Date'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date" v-model="eventDate" v-on:keyup.enter="handleSubmitForm" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button class="mr-10 border border-red-700 bg-white text-red-700 rounded" @click="clearSearch" type="submit">
            Clear Search
          </button>
          <button class="bg-red-700 text-white rounded" @click="handleSubmitForm" type="submit">
            Search Event
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Events</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Event Date</th>
              <th class="p-4 text-left">Event Address</th>
              <th class="p-4 text-left">Event Attendees</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr @click="(user.role === 'editor') ? editEvent(event._id) : null" v-for="event in events" 
            :key="event._id">
              <td class="p-2 text-left">{{ event.name }}</td>
              <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
              <td class="p-2 text-left">{{ event.address?.line1 }}</td>
              <td class="p-2 text-left">{{ event.attendees?.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
