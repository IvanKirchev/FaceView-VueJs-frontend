<template>
  <nav class="navbar navbar-light">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <router-link :to="homeLink" class="navbar-brand cool-font">FaceView</router-link>
        </div>

        <!--<ul class="nav navbar-nav">
          <router-link to="/portfolio" tag="li" activeClass="active"><a>Portfolio</a></router-link>
          <router-link to="/stocks" tag="li" activeClass="active"><a>Stocks</a></router-link>
        </ul>-->
        <app-search v-if="isAuth"></app-search>

        <strong class="navbar-text navbar-right"></strong>
        <app-profile-link v-if="isAuth"></app-profile-link>
        <app-requests-notification v-if="isAuth"></app-requests-notification>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!isAuth" class="f-link" @click="switchView('app-login')"><a>Login</a></li>
          <li v-if="!isAuth" class="f-link" @click="switchView('app-register')"><a>Register</a></li>
          <li v-if="isAuth" class="f-link" @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import AppSearch from './Search'
  import AppProfileLink from './users/ProfileLink.vue'
  import AppRequestsNotification from './auth/RequestsNotification.vue'

  export default {
    data() {
      return {}
    },
    methods: {
      switchView(view) {
        this.$store.dispatch('changeAuthView', view)
      },
      logout() {
        this.$store.dispatch('logout')
        this.$router.replace('/')
      }
    },
    computed: {
      isAuth() {
        return !!this.$store.getters.isAuth
      },
      homeLink() {
        if (!!this.$store.getters.isAuth) {
          return '/home'
        } else {
          return '/'
        }
      }
    },
    components: {
      AppSearch,
      AppProfileLink,
      AppRequestsNotification
    }
  }
</script>

<style>
  @import url("http://fonts.googleapis.com/css?family=Lobster+Two");

  .f-link {
    cursor: pointer;
  }

  .cool-font {
    font: 400 34px 'Lobster Two', Helvetica, sans-serif;
    position: relative;
    top: -11px;
  }

  li {
    font-size: 20px;
  }

  .navbar {
    background-color: #e3f2fd;
  }


</style>
