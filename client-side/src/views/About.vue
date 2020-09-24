<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'About',
  methods: {
    ...mapActions([
      'updateMessageBox'
    ])
  },
  created() {
    clearInterval(window.chatInterval)
    this.updateMessageBox()
  }
}
</script>