<template>
  <b-container style="height: 100%">
    <b-row style="height: 100%">
      <b-col style="display: flex ; justify-content : center; align-items: center">
        <md-card style="width: 300px; height: 200px">

          <md-card-content>
            <md-field>
              <label>Nom serveur</label>
              <md-input v-model="server" v-on:keyup.enter="addServer($event)"></md-input>
            </md-field>
          </md-card-content>

          <md-card-actions style="justify-content: center">
            <md-button class="md-raised" v-on:click="onSend">Envoyer</md-button>
          </md-card-actions>

        </md-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import { url } from '@/const'

export default {
  name: 'AddServer',
  data: () => ({
    server: ''
  }),
  methods: {
    onSend: function () {
      this.$store.commit('listServers', this.server)
    },
    addServer (event) {
      if (event.target.value !== '') {
        const roomName = event.target.value
        const data = new FormData()
        data.set('creator_id', this.$store.getters.user.data._id)
        data.set('room_name', roomName)

        axios(
          {
            method: 'post',
            url: url + 'rooms',
            data: data
          })
          .then((response) => {
            this.$store.commit('addServer', response)
            this.$router.push('/tchat/' + roomName)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
