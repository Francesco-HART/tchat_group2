<template>
  <b-container>
    <b-row>
      <b-col>
        <md-card>
          <md-card-header>
            <div class="md-title">Salon {{ this.nameRoom }}</div>
          </md-card-header>
          <md-card-content>
            <md-content class="md-scrollbar">
              <div v-for="(message, index) in messageTchat" v-bind:key="index">
                <p>{{ message.pseudo }} : {{ message.message }}</p>
              </div>
            </md-content>
          </md-card-content>

          <md-card-content>
            <md-field>
              <label>Message</label>
              <md-textarea v-model="textarea"></md-textarea>
            </md-field>
          </md-card-content>

          <md-card-actions>
            <md-button v-on:click="onMessage">Envoyer</md-button>
          </md-card-actions>
        </md-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import { url } from '@/const'
import io from 'socket.io-client'

export default {
  name: 'Salon',
  props: {
    nameRoom: String
  },
  data: () => ({
    textarea: '',
    messageTchat: '',
    socket: io('http://localhost:5000')
  }),
  async mounted () {
    this.messageTchat = await this.getMessagesRoom(this.$route.params.name)
  },
  watch: {
    async $route () {
      this.messageTchat = await this.getMessagesRoom(this.$route.params.name)
    }
  },

  methods: {
    onMessage: async function () {
      const newMessage = await this.postMessagesRoom(
        this.$store.state.user.data._id,
        this.$route.params.id,
        this.textarea
      )
      this.socket
        .to(this.$route.params.id)
        .emit(this.$route.params.id, newMessage)
      this.textarea = ''
    },
    getMessagesRoom: param => {
      return axios
        .get(url + 'rooms?room_name=' + param.toLowerCase())
        .then(response => {
          return response.data
        })
    },
    postMessagesRoom: (userId, roomId, message) => {
      axios
        .post(url + 'message/public', {
          sender_id: userId,
          room_id: roomId,
          message: message
        })
        .then(response => {
          console.log(response.config.data)
          return response.config.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-content {
  max-height: 500px;
  overflow: auto;
}
</style>
