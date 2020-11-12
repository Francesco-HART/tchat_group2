<template>
  <b-container style="height: 100%">
    <b-row style="height: 100%">
      <b-col style="display: flex ; justify-content : center; align-items: center">
        <md-card style="width: 300px; height: 300px">

            <md-card-content>
              <md-field>
                <label>Login</label>
                <md-input v-model="login"></md-input>
              </md-field>
            </md-card-content>

            <md-card-content>
              <md-field>
                <label>Password</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
            </md-card-content>

            <md-card-actions style="justify-content: center">
              <md-button class="md-raised" v-on:click="onLogin">Envoyer</md-button>
            </md-card-actions>

        </md-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

/* socket.on('is_auth', (data) => {
    app.pseudo = data.pseudo;
  }) */
export default {
  name: 'Auth',
  data: () => ({
    login: '',
    password: ''
  }),

  methods: {
    onLogin: function () {
      this.$socket.emit('is_auth', { pseudo: this.login, password: this.password })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
