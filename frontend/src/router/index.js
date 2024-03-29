import { createRouter, createWebHistory } from 'vue-router'


// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    name: 'homePage',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    component: () => import('../components/serviceDetails.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/findService',
    name: 'findservice',
    props: true,
    component: () => import('../components/FindService.vue')
  },
  {
    path: '/serviceForm',
    name: 'serviceform',
    props: true,
    component: () => import('../components/serviceForm.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
