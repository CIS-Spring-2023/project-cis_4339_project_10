<template>
  <!-- Create the login container -->
  <div class="login-container">
    <!-- Create the login card -->
    <div class="login-card">
      <!-- Add the login title -->
      <h3 class="login-title">Login</h3>
      <!-- Create the login form and handle submit event -->
      <form class="login-form" @submit.prevent="store.login(username, password)">
        <!-- Create the username input field -->
        <div class="form-group">
          <label>Username: </label>
          <input type="text" class="form-control" v-model="username" placeholder="username" required>
        </div>
        <!-- Create the password input field -->
        <div class="form-group">
          <label>Password: </label>
          <input type="password" class="form-control" v-model="password" placeholder="password" required>
        </div>
        <!-- Create the submit button -->
        <button class="login-button">Submit</button>
        <!-- Add the error message element here -->
        <div v-if="store.errorMessage" class="error-message">{{ store.errorMessage }}</div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { useLoggedInUserStore } from "@/store/loggedInUser";
import axios from "axios";
const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  // Define component data
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  // Define the component setup
  setup() {
    const store = useLoggedInUserStore();
    return {
      store,
    };
  },
  // Define the component created lifecycle hook
  created() {
    this.fetchData();
  },
  // Define component methods
  methods: {
    // Fetch data from the API
    async fetchData() {
      try {
        const response = await axios.get(`${apiURL}/org`); // Replace "/org" with the correct endpoint
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>



<style>
.error-message {
  color: red;
  margin-top: 10px;
  /* Adjust the value to control the spacing */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.login-card {
  max-width: 400px;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.login-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.login-button {
  display: inline-block;
  width: 100%;
  padding: 10px;
  background-color: #c8102e;
  color: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>