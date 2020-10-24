<template>
  <div class="title">
    <h1 v-if="userData">welcome: {{ userData.username }}</h1>
    <h1 class="primary-dark p-8">Chaty</h1>
    <div class="img-container object-center">
      <img class="object-center" src="@/assets/logo.png" width="400px">
    </div>
    <h3 class="m-2">
      An <a href="https://github.com/hamzagh1998/chaty">open-source project</a> for real-time chatting
      <hr>
      <span v-if="!token">
        <router-link class="router" :to="{ name: 'Login' }">Login</router-link> 
        <router-link class="router" :to="{ name: 'Register' }">Register</router-link>
      </span>
      <router-view/>
    </h3>
    <hr>
    <h2 class="mb-12">
      check and contribute on 
      <a class="hover:text-primary-dark" href="https://github.com/hamzagh1998/chaty">Github</a>
    </h2>
  </div> 
</template>

<script>
// @ is an alias to /src
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'token',
      'userData'
    ])
  },
  methods: {
    ...mapActions([
      'getToken',
      'decodeToken',
      'updateMessageBox'
    ]),
  },
  created() {
    this.getToken()
    if (this.token) {
      clearInterval(window.chatInterval)
      this.updateMessageBox()
    }
  }
}
</script>


<style scoped>
 .title {
   text-align: center;
 }

 span {
   color: #fff;
 }

 a {
  color: #17c0eb;
 }

 .router {
   padding: 1rem;
   color: theme('colors.primary.default');
   transition: color 0.3s;
 }

 .router:hover {
   color: theme('colors.primary.dark');
 }

 .img-container {
   text-align: center;
   margin-left: 35%;
 }

 @media only screen and (max-width: theme('screens.sm')) {
     .img-container {
       margin-left: 0%;
     }
   }

</style>