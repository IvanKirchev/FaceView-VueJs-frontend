<template>
  <div>
    <app-photo v-for="photo in photos" :data="photo" ></app-photo>
  </div>
</template>

<script>
  import AppPhoto from './Photo.vue'

  export default {
    computed: {
      photos() {
        return this.$store.getters.getPhotos
      }
    },
    components: {
      AppPhoto
    }
  }
</script>

<style scoped>

</style>
