<template>
  <div class="about small-card container">
    <h1 class="text-primary-dark">
      Chaty
    </h1>
    <hr>
    <p class="text-left p-4 text-secondary-dark">
       Chaty is an open-source project,
       based on short polling technique in combination with the Fetch API, 
       to achieve the effect of "real-time" or "live" data updates with JavaScript.
       <br> 
       -For contributing check that link on Github: 
       <a class="text-primary hover:text-primary-dark" href="https://github.com/hamzagh1998/chaty">
        https://github.com/hamzagh1998/chaty
       </a>
    </p>
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

<style scoped>
  .small-card {
    max-width: 50%;
    max-height: 500px;
  }
   @media only screen and (max-width: theme('screens.sm')) {
     .small-card {
       max-height: 400px;
     }
   }
</style>