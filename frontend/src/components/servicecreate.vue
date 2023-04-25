<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { DateTime } from 'luxon';
import axios from 'axios';

const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      newService: {
        name: '',
        description: '',
        status: false,
      },
      services: [],
    };
  },

  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .post(`${apiURL}/services`, this.newService)
          .then((response) => {
            console.log(response)
            alert('Service has been added.')
            this.$router.push({ name: 'createservice' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
  
  validations() {
    return {
      newService: {
        name: { required }
      },
    }
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
        Create Service
      </h1>
    </div>
    <div class="px-10 pt-5">
      <form @submit.prevent="handleSubmitForm" class="service-form">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Create Service</h2>
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
          </div>
          <div class="mt-20 grid-cols-7">
            <button
            class="bg-red-700 text-white rounded"
            type="submit"
          >
            Create Service
          </button>
          </div>
        </div>
      </form>
      <hr class="mt-10 mb-10" />
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