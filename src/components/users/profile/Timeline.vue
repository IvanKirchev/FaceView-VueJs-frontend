<template>
  <div class="row content-container">
    <app-post class="row" v-for="post in posts" :key="post.id" :data="post"></app-post>
  </div>
</template>

<script>
  import AppPost from './Post.vue'
  export default {
    components:{
      AppPost
    },
    computed: {
      posts(){
        return this.$store.getters.getInfo.searchPosts
      }
    }
  }
</script>

<style scoped>
  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 6em;
  }
  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }
</style>
