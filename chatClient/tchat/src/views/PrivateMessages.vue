<template>
  <b-container>
    <b-row>
      <b-col>
        <md-card style="width: 100%; height: 100%">
          <md-card-content>
            <div v-for="(messagesRoom, index) in cMessagesRooms" v-bind:key="index">
              <router-link  :to="{name:'privateMessagesRoom', params: {id: messagesRoom}}">
                <md-list-item>
                  <md-icon>chat</md-icon>
                  <span class="md-list-item-text">Message de : {{messagesRoom}}</span>
                </md-list-item>
              </router-link>
            </div>
          </md-card-content>
        </md-card>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PrivateMessages',
  data: () => ({
    login: '',
    password: ''
  }),
  methods: {
    onMessage: function () {
      this.$store.commit('listServers', this.server)
    }
  },
  computed: {
    cMessagesRooms: {
      get () {
        return this.$store.state.messagesRooms
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
