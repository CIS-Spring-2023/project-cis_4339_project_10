import { createApp, markRaw } from 'vue'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'

const app = createApp(App)

//create a pinia root store
const pinia = createPinia();
//pinia should be able to use router - has to be setup as plugin
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

//add pinia object to our instance
app.use(pinia)
app.use(router)
app.mount('#app')