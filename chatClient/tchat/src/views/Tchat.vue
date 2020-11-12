<template>
  <Salon v-bind:nameRoom="room"/>
</template>

<script>

import Salon from '@/components/Salon'

export default {
  name: 'Tchat',
  data: () => ({
    room: ''
  }),
  mounted () {
    this.room = this.$route.params.id
  },
  watch: {
    $route () {
      this.room = this.$route.params.id
    }
  },
  components: {
    Salon
  }
}
</script>

<style lang="scss" scoped>

</style>
