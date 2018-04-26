<template>
  <div class="row content-container">
    <div class="com-md-12 col-sm-12 heading">
      <h2 class="text-center" >Check out your posts</h2>
    </div>
    <app-post @remove="removePost($event)" v-for="post in posts" :key="post.id" :data="post"></app-post>
  </div>
</template>

<script>
  import AppPost from './Post.vue'
  export default {
    data() {
      return {
      }
    },
    props: ['posts'],
    components: {
      AppPost
    },
    methods:{
      removePost(id){
        this.$emit('remove', id)
      }
    }
  }
</script>

<style scoped>
  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 5em;
  }

  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }
</style>
