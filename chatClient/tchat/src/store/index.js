import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    server: '',
    servers: []
  },
  getters: {
    server: state => state.server,
    servers: state => state.servers
  },
  mutations: {
    changeCity (state, server) {
      state.server = server
    },
    listServers (state, servers) {
      state.servers.push(servers)
      console.log(state.servers)
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
