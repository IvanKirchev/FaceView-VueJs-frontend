<template>
  <div class="col-md-3 col-sm-5 col-sm-offset-1 wrapper">
    <div class="row">
      <div class="col-md-4">
        <img v-if="data.profilePic" :src="data.profilePic" alt="">
        <img v-else src="../../../assets/no-avatar.jpg" alt="">
      </div>
      <div class="col-md-6">
        <router-link :to="'/users/' + id"><h4>{{data.username}}</h4></router-link>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    props: ['data'],
    computed:{
      id(){
        return this.data._links.self.href.split("/")[4]
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
  }
  .wrapper{
    background-color: whitesmoke;
    margin-top: 1em;
    padding: 1em;
  }
</style>
