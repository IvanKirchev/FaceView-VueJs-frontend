<template>
<div class="row content-container">
    <app-friend v-for="friend in friends" :data="friend"></app-friend>
</div>
</template>

<script>
  import AppFriend from './Friend.vue'
    export default {
        data(){
          return {

          }
        },
      computed:{
          friends(){
            return this.$store.getters.getFriends
          }
      },
      components:{
          AppFriend
      }
    }
</script>

<style scoped>

  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 7em;
    padding: 2em;
  }

  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }
</style>
