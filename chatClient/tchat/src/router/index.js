import Vue from 'vue'
import VueRouter from 'vue-router'
import Tchat from '@/views/Tchat'
import Auth from '@/views/Auth'
import AddServer from '@/views/AddServer'
import PrivateMessages from '@/views/PrivateMessages'
import store from '@/store'

Vue.use(VueRouter)

function guardMyroute (to, from, next) {
  console.log(store.getters.user.data)
  const isAuthenticated = !!store.getters.user.data
  if (isAuthenticated) {
    next('/tchat/Général')
  } else {
    next('/auth')
  }
}

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/addServer',
    name: 'AddServer',
    beforeEnter: guardMyroute,
    component: AddServer
  },
  {
    path: '/tchat/:id',
    name: 'Tchat',
    component: Tchat
  },
  {
    path: '/privateMessages',
    name: 'privateMessages',
    beforeEnter: guardMyroute,
    component: PrivateMessages
  },
  {
    path: '/privateMessages/:id',
    name: 'privateMessagesRoom',
    beforeEnter: guardMyroute,
    component: Tchat
  },
  {
    path: '*',
    name: 'Auth',
    beforeEnter: guardMyroute,
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
