<template>
  <Salon v-bind:nameRoom="room" />
</template>

<script>
import Salon from '@/components/Salon'
import io from 'socket.io-client'

export default {
  name: 'Tchat',
  data: () => ({
    room: '',
    socket: io('http://localhost:5000')
  }),
  mounted () {
    this.room = this.$route.params.name
  },
  watch: {
    $route () {
      // this.socket.join(this.$route.params.name)
      this.room = this.$route.params.name
    }
  },
  components: {
    Salon
  }
}
</script>

<style lang="scss" scoped></style>
