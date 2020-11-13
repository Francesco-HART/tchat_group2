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
    server: null,
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
      state.user = user
    },
    addMessageSent (state, newMessage) {
      newMessage.pseudo = state.user.pseudo
      state.server.room_converse = [...state.server.conversation, newMessage]
    },
    addMessage (state, newMessage) {
      state.server.room_converse = [...state.server.conversation, newMessage]
    },
    setServer (state, server) {
      state.server = server
    },
    listServers (state, servers) {
      state.servers = servers
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin]
})
