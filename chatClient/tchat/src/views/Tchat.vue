<template>
  <Salon v-bind:nameRoom="room" />
</template>

<script>
import Salon from '@/components/Salon'

export default {
  name: 'Tchat',
  data: () => ({
    room: ''
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
