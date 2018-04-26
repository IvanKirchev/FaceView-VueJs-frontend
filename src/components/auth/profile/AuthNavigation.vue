<template>
  <div class="col-md-9 col-sm-12 justify-content-center profile-nav">
    <div class="row text-center">
      <div @click="switchView('app-posts')" class="col-md-2 item"><h3>Timeline</h3></div>
      <div @click="switchView('app-about')" class="col-md-2 item"><h3>About</h3></div>
      <div @click="switchView('app-friends')" class="col-md-2 item"><h3>Friends</h3></div>
      <div @click="switchView('app-gallery')" class="col-md-2 item"><h3>Gallery</h3></div>
      <div @click="switchView('app-new-post')" class="col-md-3 item"><h3>New Post</h3></div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return {

        }
      },
      methods: {
        switchView(viewName){
          this.$emit('switch', viewName)
          if(viewName === 'app-posts'){
            this.$emit('loadPosts')
          }else if(viewName === 'app-friends'){
            this.$store.dispatch('loadFriends')
          }else if(viewName === 'app-gallery'){
            this.$store.dispatch('loadGallery')
          }
        }
      }
    }
</script>

<style scoped>
  .profile-nav{
    bottom: 2rem;
    padding-right: 0;
  }
  .text-center {
    background-color: #dadada;
  }
  .item {
    cursor: pointer;
  }
</style>
