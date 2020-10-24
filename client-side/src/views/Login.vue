<template>
  <div v-bind:class="[{'loading': isLoading}, 'container mx-auto form-container']">
    <font-awesome-icon icon="circle-notch" class="fa-spinner spinner" v-if="isLoading"/>
    <h1>Login :</h1>
    <hr>
    <form>
      <input type="text" 
             class="outline-none focus:bg-secondary-light"
             v-model="username" 
             placeholder="Enter username" 
             required>
      <br>
      <input type="password" 
             class="outline-none focus:bg-secondary-light"
             v-model="password" 
             placeholder="Enter password" 
             required>
      <br>
      <small v-if="error">{{ error }}</small>
      <br>
      <button type="submit" 
              class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full p-2 m-2"
              @click.prevent="loginUser">
        Login
      </button>
      <router-link :to="{ name: 'Register' }" class="secondary-default hover:text-secondary-dark">
        Register
      </router-link>
    </form>
  </div>
</template>

<script>
import RequestHandler from '@/services/request-handler'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
      error: null
    }
  },
  computed: {
    ...mapState([
      'isLoading'
    ])
  },
  methods: {
    ...mapActions([
      'setLoadingStatus',
      'removeLodingStatus',
      'getToken'
    ]),
    async loginUser() {
      this.setLoadingStatus()
      // Send request to the server
      const res = await RequestHandler.postHandler('api/auth/login', {username: this.username.trim().toLowerCase(), password: this.password})
      this.removeLodingStatus()
      res.error ? this.error = res.msg : this.registerToken(res.token)
    },
    registerToken(token) {
      localStorage.setItem('token', token)
      this.getToken() // set the token to the global state
      this.$router.push({ name: 'Messages' })
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$router.push({ name: "Home" })
    }
  }
}
</script>

<style scoped>
  .form-container {
    text-align: center;
    border: 1px solid theme('colors.secondary.default');
    border-radius: 5px;
    max-width: 30%;
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 4px 2px theme('colors.secondary.default');
  }

  small {
    color: #f00;
  }

  @media only screen and (max-width: theme('screens.sm')) {
    .form-container {
      max-width: 90%;
    }
  }
</style>
