<template>
    <router-view />
</template>

<script>
  import Home from './Home.vue';
  import Login from './Login.vue';
  export default {
      components: {
        Home,
        Login,
      },
  }
</script>

<style></style>
