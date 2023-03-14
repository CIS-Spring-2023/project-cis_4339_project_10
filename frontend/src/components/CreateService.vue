<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      newService: {
        name: '',
        description: '',
        status: false,
      },
      services: [
        { id: 1, name: 'Service A', description: 'Description of Service A', status: 'Active' },
        { id: 2, name: 'Service B', description: 'Description of Service B', status: 'Active' },
        { id: 3, name: 'Service C', description: 'Description of Service C', status: 'Inactive' },
      ],
      // Parameter for search to occur
  };
},

  methods: {
    addService() {
  // Add the new service to the services array
  this.services.push({
    id: this.services.length + 1, // Generate a new ID
    name: this.newService.name,
    description: this.newService.description,
    status: this.newService.status ? 'Active' : 'Inactive'
  });

  // Reset the newService object
  this.newService = {
    name: '',
    description: '',
    status: false
  };
    },
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    deleteService(index) {
      if (confirm("Are you sure you want to delete this service?")) {
        this.services.splice(index, 1);
      }
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
        Edit Service
      </h1>
    </div>
    <div class="px-10 pt-5">
      <form @submit.prevent="addService" class="service-form">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>
        <div class="flex flex-col">
          <div class="flex">
            <label class="block flex flex-col">
              <span class="text-gray-700 font-normal">Name:</span>
              <input v-model="newService.name" type="text" />
            </label>
            <label class="block flex flex-col ml-6">
              <span class="text-gray-700">Description:</span>
              <input v-model="newService.description" type="text" />
            </label>
            <label class="block flex items-center ml-6">
              <span class="text-gray-700">Status:</span>
              <input v-model="newService.status" type="checkbox" />
            </label>
            </div>
            <button type="submit" class="submit-button w-24">Create</button>
          </div>
        </div>
      </form>
      <hr class="mt-10 mb-10" />
      <!-- Display Found Data -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Services</h2>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Service Name</th>
                <th class="p-4 text-left">Service Description</th>
                <th class="p-4 text-left">Service Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                v-for="(service, index) in services"
                :key="index"
                :class="{'row-active': service.status === 'Active', 'row-inactive': service.status === 'Inactive'}"
              >
                <td class="p-2 text-left">{{ service.name }}</td>
                <td class="p-2 text-left">{{ service.description }}</td>
                <td class="p-2 text-left">{{ service.status }}</td>
                <td class="p-2 text-left">{{ service.serviceID }}</td>
                <td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
.row-inactive {
  background-color: #b8b0b1;
}

.row-active {
  background-color: #03a80b;
}
.service-form label {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.service-form label span {
  margin-bottom: 5px;
}

.service-form input:not([type="checkbox"]) {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
}
.submit-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>