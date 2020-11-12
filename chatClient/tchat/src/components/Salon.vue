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
              <p>Autem enim asperiores consequuntur neque sequi ea similique ex maxime, repudiandae doloremque aliquam exercitationem omnis assumenda. Rem suscipit pariatur vero facere?</p>
              <p>Necessitatibus aut cumque sit ad. Tempora perferendis nostrum, in assumenda accusantium vitae vero pariatur sapiente nam quisquam, ducimus distinctio quae nisi.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed perspiciatis sit quaerat molestiae iusto adipisci possimus cum modi quam qui esse vero provident, ad, deserunt laborum quas eligendi beatae quibusdam.</p>
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

export default {
  name: 'Salon',
  props: {
    nameRoom: String
  },
  data: () => ({
    textarea: '',
    messageTchat: ''
  }),
  methods: {
    onMessage: function () {
      console.log(this.textarea)
      this.textarea = ''
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
