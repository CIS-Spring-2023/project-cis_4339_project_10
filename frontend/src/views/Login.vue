<template>
    <div class="login-container">
          <div class="login-card">
              <h3 class="login-title">Login</h3>
              <form class="login-form" @submit.prevent="store.login(username, password)" novalidate="true">
                  <div class="form-group">
                      <label>Username: </label>
                      <input type="text" class="form-control" v-model="username" placeholder="username" required>
                  </div>
                  <div class="form-group">
                      <label>Password: </label>
                      <input type="password" class="form-control" v-model="password" placeholder="password" required>
                  </div>
                  <button class="login-button">Submit</button>
              </form>
          </div>
    </div>
  </template>
  
  <script>
  import { useLoggedInUserStore } from "@/store/loggedInUser";
  
  export default {
    data: () => {
      return {
        username: "",
        password: "",
      };
    },
    setup() {
      const store = useLoggedInUserStore()
      return {
        // you can return the whole store instance to use it in the template
        store,
      }
    }
  };
  </script>

<style>

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