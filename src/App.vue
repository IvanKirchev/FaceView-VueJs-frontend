<template>
  <div class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppHeader from './components/Header.vue'

  export default {
    components: {
      AppHeader
    },
    created(){
      this.$store.dispatch('tryAutoLogin')
    }
  }
</script>

<style>

</style>
