<template>
  <div 
    :class="
    [chatMessages.user.id === userId ? 
    'bg-primary text-white user-msg' : 
    'bg-secondary text-white peer-msg']">
    <p>{{ chatMessages.message }}</p> 
    <hr>
    <small class="text-secondary-dark">At: {{ chatMessages.dateSended | formatDate }}</small>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

export default {
  name: 'InboxComp',
  props: {
    chatMessages: {
      Type: Object
    }
  },
  data() {
    return {
      userId: null
    }
  },
  computed: {
    ...mapState([
      'userData'
    ])
  },
  created() {
    this.userId = this.userData.id
  }
}
</script>

<style scoped>
  .user-msg {
    margin-left: 55%;
    max-width: 45%;
    border-radius: 8px;
    overflow: hidden;
  }

  .peer-msg {
    margin-right: 55%;
    max-width: 45%;
    border-radius: 8px;
    overflow: hidden;
  }

  small {
    font-size: 60%;
  }

  @media only screen and (max-width: theme('screens.sm')) {
    .user-msg {
      min-width: 50%;
      margin-left: 50%;
    }
    .peer-msg {
      min-width: 50%;
      margin-right: 55%;
    }
    p {
      font-size: 80%;
    }
  }
</style>