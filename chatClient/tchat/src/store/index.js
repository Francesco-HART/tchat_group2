import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: null,
    server: '',
    servers: [],
    messagesRooms: ['test', 'Antony']
  },
  getters: {
    user: state => state.user,
    server: state => state.server,
    servers: state => state.servers,
    messagesRooms: state => state.messagesRooms
  },
  mutations: {
    setUser (state, user) {
      console.log(user)
      state.user = user
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
