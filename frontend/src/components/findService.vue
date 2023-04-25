<script>
import { DateTime } from 'luxon';
import axios from 'axios';

const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  data() {
    return {
      newService: {
        name: '',
        description: '',
        status: false,
      },
      services: [],
      searchBy: '',
      name: '',
      status: ''
    };
  },

  methods: {
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

    async deleteService(index) {
      if (confirm('Are you sure you want to delete this service?')) {
        try {
          const { data } = await axios.delete(`${apiURL}/services/${this.services[index].id}`);
          console.log(data);

          // Remove the service from the services array
          this.services.splice(index, 1);
        } catch (error) {
          console.error(error);
          alert('Failed to delete service.');
        }
      }
    },

    async fetchServices() {
      try {
        const { data } = await axios.get(`${apiURL}/services`);
        this.services = data;
        console.log(data)
      } catch (error) {
        console.error(error);
        alert('Failed to fetch services.');
      }
    },

    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc',
      });
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString();
    },

    editService(serviceID) {
      this.$router.push({ name: 'servicedetails', params: { id: serviceID } });
    },
  },

  created() {
    this.fetchServices();
  },
};

</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Find Service
      </h1>
    </div>
    <div class="px-10 pt-20">
    <div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
>
  <h2 class="text-2xl font-bold">Search Services By</h2>
  <!-- Displays Client Name search field -->
  <div class="flex flex-col">
    <select
      class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      v-model="searchBy"
    >
      <option value="Service Name">Service Name</option>
      <!-- <option value="Service Status">Service Status</option> -->
    </select>
  </div>
  <div class="flex flex-col" v-if="searchBy === 'Service Name'">
    <label class="block">
      <input
        type="text"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        v-model="name"
        v-on:keyup.enter="handleSubmitForm"
        placeholder="Enter Service name"
      />
    </label>
  </div>
  <!-- <div class="flex flex-col" v-if="searchBy === 'Service Status'">
    <input
      class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      type="status"
      v-model="status"
      v-on:keyup.enter="handleSubmitForm"
      placeholder="Enter Service Status"
    />
  </div> -->
  </div>
</div> <!-- Closing tag for the first div container -->

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
      Search Event
    </button>
  </div>
</div>
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
                :key="index" @click="editService(service._id)"
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
  background-color: #C8102E;
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
  background-color: #C8102E;
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
.submit-button1 {
  background-color: #C8102E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
.submit-button1:hover {
  background-color: #6b1405;
}
.create-button {
  background-color: #a72c28;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

</style>