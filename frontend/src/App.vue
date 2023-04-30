<script>
// Import the required modules
import axios from 'axios'
import { useLoggedInUserStore } from '@/store/loggedInUser'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  setup() {
    // Get the user store
    const user = useLoggedInUserStore()
    return { user }
  },
  data() {
    return {
      orgName: ''
    }
  },
  created() {
    // Fetch organization name on component creation
    axios.get(`${apiURL}/org`).then((res) => {
      console.log('chilldood', res)
      if (res.data && res.data.name) {
        this.orgName = res.data.name
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col" style="display: flex; flex-direction: column; gap: 0.25rem;">
            <li v-if="!user.isLoggedIn && !user.userloggedin">
              <router-link class="nav-link" to="/login">
                <span style="position: relative; top: 6px" class="material-icons">security</span>
                Login
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="user.role === 'editor' || user.role === 'viewer'">
              <a class="nav-link dropdown-toggle" href="#" id="navbarUserMenuLink" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="bi bi-person-fill" style="font-size: 1rem; color: hsla(160, 100%, 37%, 1)"></i> Welcome, {{
                  user.name }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarUserMenuLink">
                <li class="nav-item">
                  <a href="/">
                    <span @click="store.logout()" class="nav-link"><i class="bi bi-box-arrow-left"></i> Logout</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor'" to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor'" to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor'" to="/serviceForm">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Service
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor' || user.role === 'viewer'" to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor' || user.role === 'viewer'" to="/findevents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
            <li>
              <router-link v-if="user.role === 'editor' || user.role === 'viewer'" to="/findservice">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Service
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section class="flex justify-start items-center h-24"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)">
        <h1 class="mr-20 text-3xl text-white" style="color: #c80128">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>