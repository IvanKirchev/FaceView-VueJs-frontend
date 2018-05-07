<template>
  <div class="col-md-1 h-max noty-zone">
    <i :class="{ 'c-badge': hasNotification }" @click="viewRequests" class="fas fa-bell"></i>

    <transition name="flip" mode="out-in">
      <div v-if="showDropdown" class="dropdown">
        <ul class="r-container">
          <li style="text-align: center" v-if="friendRequests.length === 0"><p>No requests...</p></li>
          <li v-for="request in friendRequests" class="row">
            <div class="col-md-4">
              <img v-if="request.senderProfilePic" :src="request.senderProfilePic" width="100%">
              <img v-else src="../../assets/no-avatar.jpg" width="100%">
            </div>
            <div class="col-md-4">
              {{request.senderUsername}}
            </div>
            <div class="col-md-4">
              <button @click="acceptRequest(request.senderId)" class="btn btn-success"><i class="fas fa-thumbs-up"></i>
              </button>
              <button @click="declineRequest(request.senderId)" class="btn btn-danger"><i
                class="fas fa-thumbs-down"></i>
              </button>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        showDropdown: false,
        showNotification: false,
        friendRequests: []
      }
    },
    methods: {
      viewRequests() {
        this.showDropdown = !this.showDropdown

        if (this.showDropdown && this.friendRequests.length === 0) {
          axios.get("/requests/active", {headers: {'Authorization': this.$store.getters.isAuth}})
            .then(res => {
              this.friendRequests = res.data
            })
        }
      },
      acceptRequest(senderId) {
        axios.post("/requests/accept", {
          senderId: senderId,
          receiverId: this.$store.getters.getUserId
        }, {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            this.friendRequests = this.friendRequests.filter(r => {
              return r.senderId !== senderId
            })
            if (this.friendRequests.length === 0) {
              this.showNotification = false;
            }
            this.$router.push("/profile")
          })
      },
      declineRequest(senderId) {
        axios.post("/requests/decline", {
          senderId: senderId,
          receiverId: this.$store.getters.getUserId
        }, {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            this.friendRequests = this.friendRequests.filter(r => {
              return r.senderId !== senderId
            })
            if (this.friendRequests.length === 0) {
              this.showNotification = false;
            }
          })
      }
    },
    computed: {
      hasNotification() {
        axios.get('/requests/active/check', {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            this.showNotification = res.data.result
          })
        return this.showNotification
      }
    },
    created() {
      let vm = this;
      var popElement = document.getElementsByClassName("noty-zone");
      document.addEventListener('click', function (event) {
        for (let i = 0; i < popElement.length; i++) {
          let popEl = popElement[0];
          var isClickInside = popEl.contains(event.target);
          if (!isClickInside) {
            vm.showDropdown = false
          }
        }
      });
    }
  }
</script>

<style scoped>
  i {
    font-size: 2em;
  }

  .h-max {
    margin-top: 1em;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    width: 20em;
    background-color: #dadada;
    z-index: 1;
  }

  .c-badge:after {
    content: "!";
    position: absolute;
    background: rgba(0, 0, 255, 1);
    height: 2rem;
    top: -1rem;
    right: 4rem;
    width: 2rem;
    text-align: center;
    line-height: 2rem;;
    font-size: 1rem;
    border-radius: 50%;
    color: white;
    border: 1px solid blue;
  }

  li {
    list-style: none;
    margin-bottom: 1em;
  }

  ul {
    padding: 1rem;
  }

  button {
    padding: 5px;
  }

  button i {
    font-size: 1em;
  }

  .flip-enter{

  }

  .flip-enter-active{
    animation: flip-out 0.5s ease-out forwards;
  }

  .flip-leave{

  }

  .flip-leave-active{
    animation: flip-in 0.5s ease-out forwards;
  }

  @keyframes flip-in {
    from{
      transform: rotateY(0deg);
    }
    to{
      transform: rotateY(90deg);
    }
  }

  @keyframes flip-out {
    from{
      transform: rotateY(90deg);
    }
    to{
      transform: rotateY(0deg);
    }
  }
</style>
