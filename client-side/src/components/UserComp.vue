<template>
  <div class="card hover:bg-secondary-light">
    <h1 class="primary-default">{{ user.username }}</h1>
    <button
      class="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-full p-2 m-2"
      @click.prevent="$emit('on-send-msg', $event, user.id)"
      >
      send message
    </button>
  </div>
</template>

<script>
export default {
  name: 'UserComp',
  props: {
    user: {
      Type: Object
    }
  }  
}
</script>
