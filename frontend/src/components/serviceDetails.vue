<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      service: {
        name: '',
        description: '',
        status: false,
      },
      services: [],
    };
  },
  created() {
    axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => {
      this.service = res.data
      // this.event.date = this.formattedDate(this.event.date)
      // this.event.attendees.forEach((e) => {
      //   axios.get(`${apiURL}/clients/id/${e}`).then((res) => {
      //     this.clientAttendees.push(res.data)
        })
    //   })
    // })
  },
  methods: {
    // better formatted date, converts UTC to local time
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toISODate()
    },
    handleServiceUpdate() {
      axios.put(`${apiURL}/services/update/${this.$route.params.id}`, this.service).then(() => {
        alert('Update has been saved.')
        this.$router.back()
      })
    },
    // editClient(clientID) {
    //   this.$router.push({ name: 'updateclient', params: { id: clientID } })
    // },
    ServiceDelete() {
      axios.delete(`${apiURL}/services/${this.$route.params.id}`).then(() => {
        alert('Event has been deleted.')
        this.$router.push({ name: 'findservice' })
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required },
      }
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
        Edit New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
              <span class="text-black" v-if="v$.service.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
            <br>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Description</span>
              <!-- added missing v-model connection -->
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="service.description"
              ></textarea>
            </label>
          </div>
          </div>

          <div></div>
          <div></div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleServiceUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Event
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="ServiceDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Event
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to edit/display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">City</th>
                  <th class="p-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr
                  @click="editClient(client._id)"
                  v-for="client in clientAttendees"
                  :key="client._id"
                >
                  <td class="p-2 text-left">
                    {{ client.firstName + ' ' + client.lastName }}
                  </td>
                  <td class="p-2 text-left">{{ client.address.city }}</td>
                  <td class="p-2 text-left">
                    {{ client.phoneNumber.primary }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
