<template>
    <navbar/>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    'navbar':Navbar,
  }
}
</script>

<style>
  html, body {
    box-sizing: border-box;
    padding: 0%;
    margin: 0%;
    height: 100%;
    scroll-behavior: smooth;
    background-color: theme('colors.secondary.light');
    font-family: Helvetica, sans-serif;
  }

  h1 {
    font-size: 2em;
  }

  .card {
    margin: auto;
    text-align: center;
    border: 1px solid theme('colors.secondary.default');
    border-radius: 5px;
    max-width: 100%;
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 4px 2px theme('colors.secondary.default');
  }

  .small-card {
    margin: auto;
    text-align: center;
    border: 1px solid theme('colors.secondary.default');
    border-radius: 5px;
    max-width: 40%;
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 4px 2px theme('colors.secondary.default');
  }

  /* Primary colors */
  .primary-default {
    color: theme('colors.primary.default')
  }
  .primary-light {
    color: theme('colors.primary.light')
  }
  .primary-dark {
    color: theme('colors.primary.dark')
  }
  /* Secondary colors */
  .secondary-default {
    color: theme('colors.secondary.default')
  }
  .secondary-light {
    color: theme('colors.secondary.light')
  }
  .secondary-dark {
    color: theme('colors.secondary.dark')
  }

  .loading {
    opacity: 0.5;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size:64px;
    color: theme('colors.primary.default');
    opacity: 1;
    z-index: 10;
  }

  /* Define an animation behavior */
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
  /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
  .fa-spinner {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1s linear infinite;
  }

  @media only screen and (max-width: theme('screens.sm')) {
    .card, .small-card {
      min-width: 90%;
    }
    .spinner {
      top: 40%;
      left: 40%;
    }
  }
  
</style>