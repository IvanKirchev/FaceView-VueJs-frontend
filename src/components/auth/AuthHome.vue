<template>
  <div class="row content-container">
    <app-post v-for="post in posts" :key="post.id" :data="post"></app-post>
    <infinite-loading :spinner="'default'" @infinite="infiniteHandler">
      <span slot="no-more">
      All posts are loaded
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import axios from 'axios'
  import AppPost from '../users/profile/Post.vue'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data() {
      return {
        posts: [],
        page: 0
      }
    },
    created() {
    },
    components: {
      AppPost,
      InfiniteLoading
    },
    methods: {
      infiniteHandler($state) {

        axios.get("/posts/all", {
          headers: {'Authorization': this.$store.getters.isAuth},
          params: {page: this.page}
        })
          .then(res => {
            if (res.data.length > 0) {
              this.page++
              this.posts.push.apply(this.posts, res.data)
              $state.loaded()
            } else {
              $state.complete()
            }
          }).catch(e => {

            $state.complete()
        })
      }
    }
  }
</script>

<style scoped>
  .row {
    background-color: #e3e3e5;
  }

</style>
