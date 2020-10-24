<template>
  <div>
    <form>
      <input type="text" 
             class="outline-none focus:bg-secondary-light"
             v-model="message" 
             placeholder="Enter Your message" 
             required
        >
        <button @click.prevent="$emit('send-message', $event, message)">
        <font-awesome-icon icon="paper-plane"/>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MessageInputComp',
  data() {
    return {
      message: null
    }
  }
}
</script>

<style scoped>

</style>