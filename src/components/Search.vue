<template>
  <div class="col-sm-8 col-md-3 search-zone">
    <form class="navbar-form pull-right">
      <div class="input-group">
        <input
          @input="search"
          v-model="searchField"
          type="text"
          class="form-control"
          placeholder="Search"
          autocomplete="off"
        >
        <div class="input-group-btn">
          <button
            @click.prevent=""
            class="btn btn-default"
            type="submit">
            <i class="glyphicon glyphicon-search"></i>
          </button>
        </div>
      </div>
    </form>
    <transition name="slide">
      <div class="test-search" v-if="isActive" >
        <ul class="link-container">
          <li v-for="user in users" @click="redirect(user.id)">
            <router-link class="link" :to="'/users/' + user.id">{{ user.name }}</router-link>
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
        searchField: '',
        users: [],
        active: false
      }
    },
    methods: {
      search() {
        this.active = true
        if (this.searchField !== '' && this.searchField) {
          this.users = []
          const length = this.searchField.length;
          setTimeout(() => {
            console.log(length)
            if (length === this.searchField.length) {
              axios.get('/users/' + this.searchField + '/search', {headers: {'Authorization': this.$store.getters.isAuth }})
                .then(res => {
                  for (let user of res.data) {
                    this.users.push({
                      name: user.username,
                      id: user.id
                    })
                  }
                })
            }
          }, 500)
        }else{
          this.users = []
          this.active = false
        }
      },
      hide(){
        console.log('not working')
        this.active = false
      },
      test(){
        console.log('focus')
      },
      redirect(path){
        this.$store.dispatch('loadPosts', path)
        this.$store.dispatch('refreshSearchUser', path)
        this.active = false
        this.$router.push('/users/' + path)
      }
    },
    computed: {
      isActive(){
        return this.active
      }
    },
    created(){
      let vm = this;
      var popElement = document.getElementsByClassName("search-zone");
      document.addEventListener('click', function(event) {
        for(let i=0; i < popElement.length; i++){
          let popEl = popElement[0];
          var isClickInside = popEl.contains(event.target);
          if (!isClickInside) {
            vm.active = false
          }
        }
      });
    }
  }
</script>

<style scoped>
  .test-search {
    background-color: #dadada;
    position: absolute;
    left: 11%;
    top: 84%;
    width: 22rem;
    z-index: 1;
  }
  .link{
    text-decoration: none;
  }
  .link-container{
    padding: 5px;
    margin: 0;
  }

  li{
    list-style: none;
    width: 100%;
  }
  li:hover{
    background-color: aliceblue;
  }

  .slide-enter{

  }

  .slide-enter-active{
    animation: flip-out 0.5s ease-out forwards;
  }

  .slide-leave{

  }

  .slide-leave-active{
    animation: flip-in 0.5s ease-out forwards;
  }

  @keyframes flip-in {
    from{
      transform: rotateX(0deg);
    }
    to{
      transform: rotateX(90deg);
    }
  }

  @keyframes flip-out {
    from{
      transform: rotateX(90deg);
    }
    to{
      transform: rotateX(0deg);
    }
  }

</style>
