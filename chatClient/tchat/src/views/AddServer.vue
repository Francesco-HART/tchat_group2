<template>
  <b-container style="height: 100%">
    <b-row style="height: 100%">
      <b-col style="display: flex ; justify-content : center; align-items: center">
        <md-card style="width: 300px; height: 200px">

          <md-card-content>
            <md-field>
              <label>Nom serveur</label>
              <md-input v-model="server"></md-input>
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
export default {
  name: 'AddServer',
  data: () => ({
    server: ''
  }),
  methods: {
    onSend: function () {
      this.$store.commit('listServers', this.server)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
