import { defineStore } from 'pinia'

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => {
    return {
      name: "",
      isLoggedIn: false,
      userloggedin: false,
    }
  },
  actions: {
    async login(username, password) {
      try {
        const adminResponse = await adminLogin(username, password);
        if (adminResponse.isAllowed) {
          this.$patch({
            isLoggedIn: adminResponse.isAllowed,
            name: adminResponse.name,
          });
        }
        const userResponse = await viewer(username, password);
        if (userResponse.isAllowed) {
          this.$patch({
            userloggedin: userResponse.isAllowed,
            name: userResponse.name,
          });
        }
        this.$router.push("/");
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.$patch({
        name: "",
        isLoggedIn: false,
        userloggedin: false,
      });
    },
  },
});

function adminLogin(u, p) {
  if (u === "ed" && p === "ed") {
    return Promise.resolve({ isAllowed: true, name: "John Doe" });
  } else {
    return Promise.resolve({ isAllowed: false });
  }
}

function viewer(u, p) {
  if (u === "mztauqir" && p === "zaid123") {
    return Promise.resolve({ isAllowed: true, name: "Zaid Tauqir" });
  } else {
    return Promise.resolve({ isAllowed: false });
  }
}
