import Vue from 'vue'
import VueRouter from 'vue-router'
import Tchat from '@/views/Tchat'
import Auth from '@/views/Auth'
import AddServer from '@/views/AddServer'
import PrivateMessages from '@/views/PrivateMessages'
import store from '@/store'

Vue.use(VueRouter)

function isUserExist () {
  try {
    return !!store.getters.user.data
  } catch (e) {
    return false
  }
}

function guardMyrouteLoggin (to, from, next) {
  const isAuthenticated = isUserExist()
  if (isAuthenticated) {
    next('/tchat/général/5fad386d9b98bf151df5b666')
  } else {
    next('/auth')
  }
}

function guardMyroute (to, from, next) {
  const isAuthenticated = isUserExist()
  if (isAuthenticated) {
    next()
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
    path: '/tchat/:name/:id',
    name: 'Tchat',
    beforeEnter: guardMyroute,
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
    beforeEnter: guardMyrouteLoggin,
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
