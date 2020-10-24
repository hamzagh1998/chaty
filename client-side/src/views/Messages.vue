<template>
  <div id="messages-container" 
       v-bind:class="[{'loading': isLoading}, 'container mx-auto form-container']">
    <font-awesome-icon icon="circle-notch" class="fa-spinner spinner" v-if="isLoading"/>
    <h2>Messages: </h2>
    <messages-comp v-for="chat in messages" 
                  :key="chat.chatId" 
                  :chat="chat" 
                  @on-chat-box="getChatBox"
                  @on-block="onBlock"
                  @on-delete="onDelete"
                  @on-unblock="onUnblock"
    />
    <h3 v-if="!messages">You have no messages for now!</h3>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import MessagesComp from '@/components/MessagesComp.vue'
import RequestHandler from '@/services/request-handler.js'

export default {
  name: 'Messages',
  computed: {
    ...mapState([
      'isLoading',
      'token',
      'messages'
    ]),
  },
  methods: {
    ...mapActions([
      'getToken',
      'updateMessageBox',
      'setLoadingStatus'
    ]),
    getChatBox(event, chatId) {
      this.$router.push({ name: 'Inbox', params: { chatId: chatId } })
    },
    async onBlock(event, peerId) {
      this.$store.state.isLoading = true
      await RequestHandler.postHandler('api/users/block', {peerId}, 'Bearer '+this.token)
    },
    async onDelete(event, chatId) {
      this.$store.state.isLoading = true
      await RequestHandler.deleteHandler('api/box/chat/'+chatId, 'Bearer '+this.token)
    },
    async onUnblock(event, peerId) {
      this.$store.state.isLoading = true
      await RequestHandler.postHandler('api/users/unblock', {peerId}, 'Bearer '+this.token)
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: "Login" })
    } else {
      this.getToken()
      clearInterval(window.chatInterval)
      this.setLoadingStatus()
      this.updateMessageBox()
    }
},
  components: {
    MessagesComp,
  }
}
</script>
