<template>
  <div class="container">
    <div class="cover">
      <img v-if="coverPic" class="cover" :src="coverPic" alt="">
      <img v-else src="../../assets/no-cover.png" class="cover" alt="">
      <div>
        <input type="file" @change="onFileChangedCover" ref="inputCoverImage">
        <i id="editCover" @click="onUploadCover" class="fas fa-edit pull-right"></i>
      </div>
      <div v-if="coverLoading" class="cover-loading">
        <i style="font-size: 5em" class="fa fa-spinner fa-spin"></i>
      </div>
    </div>
    <div class="row profile">
      <div class="col-md-3 col-sm-12 justify-content-center">
        <img v-if="profilePic" :src="profilePic" alt="">
        <img v-else src="../../assets/no-avatar.jpg" alt="">
        <input type="file" @change="onFileChangedProf" ref="inputProfImage">
        <i id="editProf" @click="onUploadProf" class="fas fa-edit pull-right"></i>
        <div v-if="profileLoading" class="profile-loading">
          <i style="font-size: 5em" class="fa fa-spinner fa-spin"></i>
        </div>
      </div>
      <app-auth-navigation @loadPosts="loadPosts" @switch="switchView($event)"></app-auth-navigation>
    </div>

    <component @remove="removePost($event)" :posts="posts" @posted="postCreated" :is="componentName"></component>
  </div>
</template>

<script>
  import axios from 'axios'
  import AppAuthNavigation from './profile/AuthNavigation.vue'
  import AppPosts from './profile/Posts.vue'
  import AppFriends from './profile/Friends.vue'
  import AppNewPost from './profile/NewPost.vue'
  import AppAbout from './profile/About.vue'
  import AppGallery from './profile/Gallery.vue'

  export default {
    data() {
      return {
        componentName: 'app-posts',
        posts: [],
        coverLoading: false,
        profileLoading: false
      }
    },
    computed: {
      profilePic() {
        return this.$store.getters.getProfilePic
      },
      coverPic() {
        return this.$store.getters.getCoverPic
      }
    },
    methods: {
      onUploadProf() {
        this.$refs.inputProfImage.click()
      },
      onFileChangedProf(event) {
        if (!event.target.files[0]) return
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        this.profileLoading = true;
        axios.post('/users/' + this.$store.getters.getUserId + '/profilePic', formData,
          {
            headers: {'Authorization': this.$store.getters.isAuth}
          }
        ).then(() => {
          this.$store.dispatch("refreshPic")
          this.profileLoading = false;
        })
      },
      onUploadCover() {
        this.$refs.inputCoverImage.click()
      },
      onFileChangedCover(event) {
        if (!event.target.files[0]) return
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        this.coverLoading = true;
        axios.post('/users/' + this.$store.getters.getUserId + '/coverPic', formData,
          {
            headers: {'Authorization': this.$store.getters.isAuth},
          }
        ).then(() => {
          this.$store.dispatch("refreshPic")
          this.coverLoading = false
        })
      },
      switchView(event) {
        this.componentName = event
      },
      loadPosts() {
        axios.get("/posts/timeline",
          { headers: {'Authorization': this.$store.getters.isAuth} })
          .then(res => {
              this.posts = res.data
          })
      },
      postCreated(){
        this.loadPosts()
        this.componentName = 'app-posts'
      },
      removePost(id){
        this.posts = this.posts.filter((p) => {
          return p.id !== id
        })
      }
    },
    components: {
      AppAuthNavigation,
      AppPosts,
      AppFriends,
      AppNewPost,
      AppAbout,
      AppGallery
    },
    created(){
      this.loadPosts()
    }
  }
</script>

<style scoped>
  .cover {
    width: 100%;
    height: 20em;
  }

  .profile {
    margin: 0;
  }

  .profile img {
    width: 100%;
    border: 5px solid #cdcdcd;
    position: relative;
    top: -7em;
  }

  .profile input, .cover input {
    display: none;
  }

  #editProf:hover {
    cursor: pointer;
  }

  #editProf {
    position: relative;
    bottom: 9em;
  }

  #editCover:hover {
    cursor: pointer;
  }

  #editCover {
    position: relative;
    bottom: 20em;
    margin: 0.5em 0.5em 0 0;
  }
  .cover-loading{
    position: relative;
    z-index: 1;
    text-align: center;
    bottom: 11em;
  }
  .profile-loading{
    position: relative;
    text-align: center;
    bottom: 14em;
  }

</style>
