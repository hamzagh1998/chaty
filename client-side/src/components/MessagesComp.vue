<template>
  <div class="small-card m-auto mt-2">
    <div :class="[{'bg-primary-light': !chat.viewed}, 'text-left content cursor-pointer hover:bg-primary-light']" 
         @click="$emit('on-chat-box', $event, chat.chatId)">
      <h1 class="p-2 secondary-dark">{{ chat.peerName }}</h1>
      <p class="p-2">{{ chat.senderName }}: {{ chat.lastMessage.slice(0, 50) }}...</p>
      <p class="p-2" 
          v-if="JSON.parse(JSON.stringify(this.userData.blockedBy))
                .map(obj => obj.id).includes(chat.peerId)">
        status: <font color="#f00">Blocked!</font>
      </p>
    </div>
      <font-awesome-icon v-if="JSON.parse(JSON.stringify(this.userData.blockedBy))
                          .map(obj => obj.id).includes(chat.peerId)" icon="unlock" 
                          class="unlock-icon cursor-pointer" @click="$emit('on-unblock', $event, chat.peerId)" />
      <font-awesome-icon v-else icon="ban" class="icon cursor-pointer" @click="$emit('on-block', $event, chat.peerId)" />
      <font-awesome-icon icon="trash-alt" class="icon cursor-pointer" @click="$emit('on-delete', $event, chat.chatId)" />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'MessagesCom',
  props: {
    chat: {
      Type: String
    }
  },
  computed:{
    ...mapState([
      'userData'
    ])
  }
}
</script>

<style scoped>
  .icon {
    font-size: 200%;
    color: #f00;
    margin: 8px;
  }
  .unlock-icon {
    font-size: 200%;
    color: #0f0;
    margin: 8px;
  }
</style>