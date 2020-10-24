<template>
  <div v-bind:class="[{'loading': isLoading}, 'container mx-auto form-container']">
    <h1>Users:</h1>
    <font-awesome-icon icon="circle-notch" class="fa-spinner spinner" v-if="isLoading"/>
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <user-comp 
        v-for="user in users" 
        :key="user.id"
        :user="user"
        @on-send-msg="onSendMsg"
      />
    </div>
    <p class="p-2 m-2 text-red-600">{{ error }}</p>
  </div>
</template>

<script>
import RequestHandler from '@/services/request-handler.js'
import UserComp from '@/components/UserComp.vue'
import {mapState, mapActions} from 'vuex'


export default {
  name: 'User',
  data() {
    return {
      users: null,
      error: null
    }
  },
  computed: {
    ...mapState([
      'isLoading',
      'token',
      'userData'
    ])
  },
  methods: {
    ...mapActions([
      'getToken',
      'updateMessageBox',
      'setLoadingStatus',
      'removeLodingStatus'
    ]),
    async onSendMsg(event, peerId) {
      const message = prompt('Enter your message:')
      this.setLoadingStatus()
      const res = await RequestHandler.postHandler('api/box/chat', {peerId, message}, 'Bearer '+this.token)
      this.removeLodingStatus()
      if (res.error) {
        this.error = res.msg
      } else {
        this.$router.push({ name: 'Messages' })
      }
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: "Login" })
    } else {
      this.getToken()
      this.users = await RequestHandler.getHandler('api/users/all', 'Bearer '+this.token)
      this.users = this.users.filter(user => user.id != this.userData.id)
      clearInterval(window.chatInterval)
      this.updateMessageBox()
    }
  },
  components: {
    UserComp,
  }
}
</script>
