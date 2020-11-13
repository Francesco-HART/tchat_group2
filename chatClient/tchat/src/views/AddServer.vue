<template>
  <b-container style="height: 100%">
    <b-row style="height: 100%">
      <b-col style="display: flex ; justify-content : center; align-items: center">
        <md-card style="width: 300px; height: 200px">

          <md-card-content>
            <md-field>
              <label>Nom serveur</label>
              <md-input v-model="server" v-on:keyup.enter="addServer"></md-input>
            </md-field>
          </md-card-content>

          <md-card-actions style="justify-content: center">
            <md-button class="md-raised" v-on:click="addServer">Envoyer</md-button>
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
  data () {
    return {
      server: '',
      item: ''
    }
  },
  methods: {
    onSend: function () {
      this.$store.commit('listServers', this.server)
    },
    addServer () {
      if (this.server !== '') {
        const roomName = this.server
        axios.get(url + 'add-room?creator_id=' + this.$store.getters.user.data._id + '&room_name=' + roomName)
          .then((response) => {
            this.$store.commit('addServer', response)
            this.$router.push('/tchat/' + roomName)
          }).catch(function (erreur) {
            console.log(erreur)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
