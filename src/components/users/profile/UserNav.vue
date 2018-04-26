<template>
  <div class="row text-center">
    <div @click="returnView('app-timeline')" class="col-md-2 item"><h3>Timeline</h3></div>
    <div @click="returnView('app-about')" class="col-md-2 item"><h3>About</h3></div>
    <div @click="returnView('app-friends')" class="col-md-2 item"><h3>Friends</h3></div>
    <div v-if="addFriendVisible" @click="sendFriendRequest" class="col-md-3 item"><h3>Add Friend</h3></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        isFriend: null,
        isRequestSend: null
      }
    },
    methods: {
      returnView(name) {
        this.$emit('switched', name)
      },
      sendFriendRequest() {
        console.log("sending request")

        axios.post("/requests/new", {
          senderId: this.$store.getters.getUserId,
          receiverId: this.$route.params.id
        },
          {
            headers: {'Authorization': this.$store.getters.isAuth}
          }).then(res => {
          this.isRequestSend = true;
        })
      }
    },
    computed: {
      addFriendVisible() {

        axios.get("/friends/check/" + this.$route.params.id,
          {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            console.log('check is friend')
            this.isFriend = res.data['result']
          }).catch(e => {
          console.log(e.response.data)
        });

        axios.get("/requests/check/" + this.$route.params.id,
          {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            console.log('check is request send')
            this.isRequestSend = res.data['result']
          }).catch(e => {
          console.log(e.response.data)
        });

        return !this.isFriend && !this.isRequestSend
      }
    }

  }
</script>

<style scoped>
  .row {
    background-color: #dadada;
  }

  .item {
    cursor: pointer;
  }

  .selected {
    background-color: #c4e1e6;
  }
</style>
