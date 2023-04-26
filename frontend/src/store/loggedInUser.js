import { defineStore } from "pinia";
import axios from "axios";
const apiURL = import.meta.env.VITE_ROOT_API;

export const useLoggedInUserStore = defineStore({
  id: "loggedInUser",
  state: () => ({
    name: "",
    role: "", // Add role attribute
    isLoggedIn: false,
    errorMessage: "",
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await loginUser(username, password);

        if (response.isAllowed) {
          this.$patch({
            isLoggedIn: true,
            name: response.name,
            role: response.role, // Set the user role from the response
          });
        }
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$patch({
          errorMessage: error.message, // Set the errorMessage field
        });
      }
    },
    logout() {
      this.$patch({
        name: "",
        role: "",
        isLoggedIn: false,
      });
    },
  },
});

async function loginUser(u, p) {
  try {
    const response = await axios.post(`${apiURL}/auth/login`, {
      username: u,
      password: p,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      throw new Error("Invalid username or password");
    } else {
      // Handle other errors
      throw new Error("Failed to log in");
    }
  }
}
