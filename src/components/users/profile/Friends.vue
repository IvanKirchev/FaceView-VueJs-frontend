<template>
  <div class="row content-container">
    <app-friend v-for="friend in allFriends" :data="friend"></app-friend>
  </div>
</template>

<script>
  import AppFriend from '../../auth/profile/Friend.vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        allFriends: []
      }
    },
    computed:{

    },
    components:{
      AppFriend
    },
    created(){
      axios.get("/users/" + this.$route.params.id + '/friends', {
        headers: {'Authorization': this.$store.getters.isAuth}
      }).then(res => {
        this.allFriends = res.data._embedded.users
      })
    }
  }
</script>

<style scoped>

  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 5em;
    padding: 2em;
  }
  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }
</style>
