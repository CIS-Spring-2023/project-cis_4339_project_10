<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Update Service content -->
        <h3 class="text-center">Update Service</h3>
        <form @submit.prevent="handleUpdateForm">
          <div class="form-group">
            <label for="name">Service Name</label>
            <input type="text" id="name" class="form-control" v-model="service.name" required>
          </div>
  
          <div class="form-group">
            <label for="description">Service Description</label>
            <textarea id="description" class="form-control" v-model="service.description" required></textarea>
          </div>
  
          <div class="form-group form-check">
            <label class="form-check-label" for="status">Service Status</label>
            <input type="checkbox" id="status" class="form-check-input custom-checkbox" v-model="service.status" required>
          </div>
  
          <button class="btn btn-primary mt-3">Update</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        service: {}
      };
    },
    created() {
      let apiURL = `http://localhost:3001/service/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.service = res.data;
      });
    },
    methods: {
      handleUpdateForm() {
        let apiURL = `http://localhost:3001/service/${this.$route.params.id}`;
  
        axios
          .put(apiURL, this.service)
          .then((res) => {
            console.log(res);
            this.$router.push("/view");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  
  <style>
  .form-group label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    border-radius: 5px;
    border: 1px solid #ced4da;
    padding: 10px;
    font-size: 16px;
    width: 100%; /* subtract 20px for padding */
    box-sizing: border-box;
  }
  
  .form-group textarea {
    height: 150px;
    resize: vertical;
  }
  
  .form-group input[type="checkbox"] {
    margin-right: 5px;
    margin-top: 5px;
  }
  
  .form-group .form-check-label {
    font-weight: normal;
  }
  .form-check-input.custom-checkbox {
  width:20px; /* adjust the width as needed */
}
  
  button.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  button.btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  
  button.btn-primary:focus,
  button.btn-primary.focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  
  button.btn-primary:active,
  button.btn-primary.active {
    background-color: #0062cc;
    border-color: #005cbf;
  }
  
  button.btn-primary:active:focus,
  button.btn-primary.active:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
  
  button.btn-primary.disabled,
  button.btn-primary:disabled {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  
  button.btn-primary:not(:disabled):not(.disabled):active,
  button.btn-primary:not(:disabled):not(.disabled).active,
  button.btn-primary:not(:disabled):not(.disabled):active:focus,
  button.btn-primary:not(:disabled):not(.disabled).active:focus {
    background-color: #0062cc;
    border-color: #005cbf;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
  }
</style>

  