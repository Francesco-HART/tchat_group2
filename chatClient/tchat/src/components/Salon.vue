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
              <div
                v-for="(message, index) in room.room_converse"
                v-bind:key="index"
              >
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
import axios from "axios";
import { url } from "@/const";

export default {
  name: "Salon",
  props: {
    nameRoom: String
  },
  data: () => ({
    textarea: "",
    room: ""
  }),
  async mounted() {
    this.room = await this.getMessagesRoom(this.$route.params.id);
    this.$store.commit("setServer", this.room);
  },
  watch: {
    async $route() {
      this.room = await this.getMessagesRoom(this.$route.params.id);

      this.socket.on(this.$route.params.id, data => {
        console.log(data);
        this.$store.commit("addMessage", data);
      });
    }
  },

  methods: {
    onMessage: async function() {
      const newMessage = await this.postMessagesRoom(
        this.$store.state.user.data._id,
        this.$route.params.id,
        this.textarea
      );
      this.$store.commit("addMessage", newMessage);
      this.textarea = "";
    },
    getMessagesRoom: param => {
      return axios.get(url + "rooms?room_id=" + param).then(response => {
        return response.data;
      });
    },
    postMessagesRoom: async (userId, roomId, message) => {
      const newMessages = await axios.post(url + "message/public", {
        sender_id: userId,
        room_id: roomId,
        message: message
      });
      return newMessages.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-content {
  max-height: 500px;
  overflow: auto;
}
</style>
