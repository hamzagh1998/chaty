<template>
  <div>
    <header class="navbar bg-primary">
      <div class="container mx-auto">
        <router-link :to="{ name: 'Home' }" class="routes">
          <font-awesome-icon icon="home" /> Chaty
        </router-link>
        <!-- if user -->
        <span v-if="token">
          <router-link :to="{ name: 'Users' }" class="routes">
            <font-awesome-icon icon="users" />
          </router-link>
          <router-link :to="{ name: 'Messages' }" class="routes">
            <font-awesome-icon icon="comment" />
            <small v-if="unviewdMsg > 0" class="text-secondary-dark">{{ unviewdMsg }}</small>
          </router-link>
          <router-link :to="{ name: 'About' }" class="routes">
            <font-awesome-icon icon="info" />
          </router-link>
          <a class="routes logout" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" />
          </a>
        </span>
        <!-- if guest -->
        <span v-else>
          <router-link :to="{ name: 'Login' }" class="routes">
            <font-awesome-icon icon="sign-in-alt" />
          </router-link>
          <router-link :to="{ name: 'Register' }" class="routes">
            <font-awesome-icon icon="user-plus"/>
          </router-link>
          <router-link :to="{ name: 'About' }" class="routes">
            <font-awesome-icon icon="info" />
          </router-link>
        </span>
      </div>
    </header>
    <!-- content -->
    <section>
      <div class="container mx-auto">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'


export default {
  name: "Navbar",
  computed: {
    ...mapState([
      'token',
      'messages'
    ]),
    unviewdMsg() {
      try {
        return this.messages.filter(msg => msg.viewed === false).length
      } catch (err) {
        return 0
      } 
    }
  },
  methods: {
    ...mapActions([
      'getToken',
      'removeToken',
    ]),
    logout() {
      clearInterval(window.msgInterval)
      this.removeToken()
      if (this.$route.name != 'Home') {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  created() {
    this.getToken()
  }
}
</script>

<style scoped>

  .navbar {
    padding: 0.5rem;
  }

  span {
    margin-left: 32%;
  }

  section {
    margin-top: 1rem;
  }

  .routes {
    font-size: 170%;
    padding: 1rem;
    color: theme('colors.secondary.light');
    transition: color 0.3s;
  }

  .routes:hover {
    color: theme('colors.secondary.default');
  }

  .logout {
    position: absolute;
    top: 0%;
    right: 2%;
  }

  @media only screen and (max-width: theme('screens.sm')) {
    span {
      margin-left: 6%;
    }
    .routes {
      font-size: 120%;
      padding: 0.5rem;
    }
  }
</style>