import Vue from 'vue'
import VueRouter from 'vue-router'
import Tchat from '@/views/Tchat'
import Auth from '@/views/Auth'
import AddServer from '@/views/AddServer'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/addServer',
    name: 'AddServer',
    component: AddServer
  },
  {
    path: '/tchat/:id',
    name: 'Tchat',
    component: Tchat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
