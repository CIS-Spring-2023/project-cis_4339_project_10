<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [
        { id: 1, name: 'Service A', description: 'Description of Service A', status: 'Active' },
        { id: 2, name: 'Service B', description: 'Description of Service B', status: 'Active' },
        { id: 3, name: 'Service C', description: 'Description of Service C', status: 'Inactive' },
      ],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      description: '',
      status: false,
    }
  },
  mounted() {
    this.getServices()
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
      if (this.searchBy === 'Service Name') {
        endpoint = `services/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Service Status') {
        endpoint = `services/search/?status=${this.status}&searchBy=status`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.services = res.data
      })
    },
    // abstracted method to get services
    getServices() {
        let apiURL = '';
            axios.get(apiURL).then(res => {
                this.services = res.data;
      })
    },
    deleteService(index) {
      if (confirm("Are you sure you want to delete this service?")) {
        this.services.splice(index, 1);
      }
    },
    
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.status = false

      this.getServices()
    },
    editService(serviceID) {
      this.$router.push({ name: 'servicedetails', params: { id: serviceID } })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Service Description">Service Description</option>
            <option value="Service Status">Service Status</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
          </label>
        </div>
        <!-- Displays service description search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Description'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="description"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter service description"
          />
        </div>
        <!-- Displays service status search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Status'">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="status"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Events</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Description</th>
              <th class="p-4 text-left">Service Status</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="service in services" :key="service._id">
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.description }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <td class="p-2 text-left">{{ service.serviceID }}</td>
              <td>
                <div class="btn-group">
                <router-link :to="{name: 'edit', params: { id: service.id }}" class="btn btn-success ">Edit</router-link>
                <button @click.prevent="deleteService(service.id)" class="btn btn-danger mx-2">Delete</button>
                </div>
        </td>
        </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<style>
.btn-group {
  display: flex;
  flex-direction: row;
}

.btn-success {
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.btn-danger {
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #a72c28;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.btn-success:hover {
  background-color: #218838;
}
.btn-danger:hover {
  background-color: #6b1405;
}
</style>