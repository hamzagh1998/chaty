<template>
  <div id="chat-container" 
      v-bind:class="[{'loading': isLoading}, 'container small-card']">
    <h2 class="p-2">Your messages with {{ peerName }} :</h2><hr>
    <font-awesome-icon icon="circle-notch" class="fa-spinner spinner" v-if="isLoading"/>
    <a id="top" href="#bottom"><b>↓</b></a>
    <inbox-comp class="box-border md:box-content m-2 p-2 w-1/3"
                v-for="chatMessage in chatMessages"
                :key="chatMessage._id"
                :chatMessages="chatMessage"
    />
    <hr>
    <message-input-comp 
                        v-if="!JSON.parse(JSON.stringify(this.userData.blockedBy))
                          .map(obj => obj.id).includes(peerId)" @send-message="sendMessage"/>
    <p v-else><font color="#f00">Blocked</font></p>
    <font color="#f00">{{ error }}</font><br>
    <a id="bottom" href="#top"><b>↑</b></a>
  </div>
</template>

<script>
import RequestHandler from '@/services/request-handler.js'
import {mapState, mapActions} from 'vuex'

import InboxComp from '@/components/InboxComp.vue'
import MessageInputComp from '@/components/MessageInputComp.vue'

export default {
  name: 'Inbox',
  data() {
    return {
      chatBox: {messages: []},
      peerId: null,
      peerName: null,
      chatMessages: null,
      error: null
    }
  },
  computed: {
    ...mapState([
      'token',
      'isLoading',
      'userData',
    ])
  },
  methods: {
    ...mapActions([
      'getToken'
    ]),
    async sendMessage(evnet, message) {
      document.querySelector('form input').value = '' // Clear the input
      if (message) {
        this.error = null
        this.$store.state.isLoading = true
        const res = await RequestHandler.postHandler('api/box/chat', {peerId: this.peerId, message}, 'Bearer '+this.token)
        if (res.error) this.error = res.msg
        this.$store.state.isLoading = false
      } else {
        this.error = "Please, enter something!"
      }
    },
    updateChatBox() {
      this.$store.state.isLoading = true
      clearInterval(window.msgInterval) // Stop client from sending messages request to the server
      clearInterval(window.chatInterval) // Clear old interval
      window.chatInterval = setInterval(() => {
        RequestHandler.getHandler('api/box/chat/'+this.$route.params.chatId, 'Bearer ' +this.token)
          .then(data => {
            this.userData.blockedBy = JSON.parse(JSON.stringify(data.blockedBy)) // Always update blcokedList
            localStorage.setItem('userData', JSON.stringify(this.userData))
            if (this.chatBox.messages.length != data.messages.length) {
              this.chatBox = data
              document.getElementById('top').click() // Scrolling to the bottom
              try {
                this.$store.state.messages.filter(chat => chat.chatId === this.chatBox._id)[0].viewed = true
              } catch (err) {
                console.error(err);
              }
              if (this.chatBox.error) {
                console.log(this.chatBox.msg)
                this.$router.push({ name: 'Login' })
              } else {
                this.peerId = this.chatBox.peer.id
                this.peerName = this.chatBox.peer.username
                this.chatMessages = this.chatBox.messages
              }
            }
            this.$store.state.isLoading = false
          })
      }, 3500)
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: "Login" })
    }
    this.getToken()
    this.updateChatBox()
 },
 components: {
   InboxComp,
   MessageInputComp
 }
}
</script>

<style scoped>
  .small-card {
    max-width: 50%;
    max-height: 500px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
   @media only screen and (max-width: theme('screens.sm')) {
     .small-card {
       max-height: 400px;
     }
   }
</style>

