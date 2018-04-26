<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title text-center">Login</h3>
    </div>
    <div v-if="loginError" class="alert alert-danger m text-center">
      {{ loginError }}
    </div>
    <form class="panel panel-body">
      <div class="form-group">
        <label>Username</label>
        <input v-model="formData.username" type="text" class="form-control"
               placeholder="Enter username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="formData.password" type="password" class="form-control" placeholder="Password">
      </div>
      <button @click.prevent="login" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          username: null,
          password: null
        },
        error: {
          message: null
        }
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login', this.formData).then(() =>{
          this.$router.replace("/home")
        })
      }
    },
    computed: {
      loginError(){
        return this.$store.getters.getLoginError
      }
    }
  }
</script>

<style scoped>
  .m{
    margin: 10px 0 10px 0;
  }
</style>
