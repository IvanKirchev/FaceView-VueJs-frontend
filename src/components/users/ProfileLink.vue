<template>
  <div class="col-md-3">
    <router-link :to="'/profile'">
      <img v-if="profilePic"
           :src="profilePic"
           alt="">
      <img v-else src="../../../src/assets/no-avatar.jpg" alt="">
    </router-link>
    <span>Hi, {{ username }}</span>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        pic: null
      }
    },
    computed: {
      username() {
        return this.$store.getters.getUsername
      },
      profilePic() {
        return this.$store.getters.getProfilePic
      }
    }

  }
</script>

<style scoped>
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  span {
    padding-left: 2em;
  }
</style>
