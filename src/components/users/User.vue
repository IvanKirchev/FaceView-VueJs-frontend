<template>
  <div>
    <div class="row">
      <img v-if="coverPic" class="cover" :src="coverPic" alt="">
      <img v-else src="../../assets/no-cover.png" class="cover" alt="">
    </div>
    <div class="row profile">
      <div class="col-md-3 col-sm-6">
        <img v-if="profilePic" :src="profilePic" alt="">
        <img v-else src="../../assets/no-avatar.jpg" alt="">
      </div>
      <div class="col-md-9 col-sm-6 p-none">
        <user-nav @switched="switchComponent($event)"></user-nav>
      </div>
    </div>
    <div class="row">
      <component :is="componentName"></component>
    </div>
  </div>
</template>

<script>
  import UserNav from "./profile/UserNav.vue"
  import ProfileLink from "./ProfileLink.vue";
  import AppTimeline from "./profile/Timeline.vue"
  import AppAbout from "./profile/About.vue"
  import AppFriends from "./profile/Friends"

  export default {
    components: {
      ProfileLink,
      UserNav,
      AppTimeline,
      AppAbout,
      AppFriends
    },
    data() {
      return {
        img: null,
        componentName: 'app-timeline',
      }
    },
    methods: {
      switchComponent(name) {
        if (name === 'app-timeline') {
          this.loadPosts()
        }

        this.componentName = name
      },
      loadPosts() {
        this.$store.dispatch('loadPosts', this.$route.params.id)
      }
    },
    computed: {
      profilePic() {
        return this.$store.getters.getInfo.searchProfilePicUrl
      },
      coverPic() {
        return this.$store.getters.getInfo.searchCoverPicUrl
      }
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

  .profile img {
    width: 100%;
    position: relative;
    bottom: 8em;
    border: 5px solid #77f579;
  }

  .p-none {
  }
</style>
