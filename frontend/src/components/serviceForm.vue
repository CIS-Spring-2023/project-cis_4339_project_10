<template>
 <div>
    <h2>Create a New Service</h2>
    <form @submit.prevent="addService" class="service-form">
      <div class="input-group">
        <label>
          Name:
          <input v-model="newService.name" type="text" />
        </label>
        <label>
          Description:
          <input v-model="newService.description" type="text" />
        </label>
        <label class="checkbox-label">
          Status:
          <input v-model="newService.status" type="checkbox" />
        </label>
      </div>
      <button type="submit">Create</button>
    </form>
    <hr />
    <h2>Services List</h2>
    <ul class="service-list">
      <li v-for="(service, index) in services" :key="index" class="service-list-item" :class="{ status: service.status }">
        <strong>{{ service.name }}</strong>
        <br />
        {{ service.description }}
        <br />
        Status: {{ service.status ? 'Active' : 'NotActive' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newService: {
        name: '',
        description: '',
        status: false,
      },
      services: [
      { id: 1, name: 'Service A', description: 'Description of Service A', status: false },
      { id: 2, name: 'Service B', description: 'Description of Service B', status: false },
      { id: 3, name: 'Service C', description: 'Description of Service C', status: false },
      ],
    };
  },
  methods: {
    addService() {
      this.services.push({ ...this.newService });
      this.newService = {
        name: '',
        description: '',
        status: false,
      };
    },
  },
};
</script>

<style>
.service-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.service-form .form-group {
  flex: 0 0 calc(50% - 1rem);
}

.service-form label {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.service-form input[type="text"],
.service-form input[type="checkbox"] {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  width: 95%;
  max-width: 600px;
}
.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

.service-form button[type="submit"] {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #4caf50;
  color: #ffff;
  border: none;
  cursor: pointer;
  margin-right: 100rem;
}

.service-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
}

.service-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.service-list-item.status {
  background-color: #4caf50;
  color: #fff;
}
</style>
