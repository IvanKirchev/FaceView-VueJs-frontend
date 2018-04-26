<template>
  <div class="col-md-5 col-sm-10 wrapper">
    <router-link :to="'/users/' + data.authorID">
      <div class="row prof-container">
        <div class="col-md-2">
          <img class="profile-pic" :src="data.authorProfilePic" alt="">
        </div>
        <div class="col-md-9 m">
          {{data.authorUsername}}
        </div>
      </div>
    </router-link>
    <div class="row content">
      {{data.content}}
    </div>
    <small>{{new Date(data.createdOn).toUTCString()}}</small>
    <div class="row pic-wrapper">
      <img class="post-pic" :src="data.imageUrl" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
  }
</script>

<style scoped>

  .profile-pic{
    border-radius: 50%;
    width: 3em;
  }
  .wrapper{
    padding: 1em 2em 1em 2em;
    margin: 1em 2em 1em 4em;
    border: 2px solid white;
    background-color: white;
  }
  .post-pic{
    width: 100%;
  }
  .content{
    margin: 2em 0 2em 0;
  }
  .prof-container{
    background-color: #f3f3f5;
  }
  .m{
    margin-top: 1rem;
  }
</style>
