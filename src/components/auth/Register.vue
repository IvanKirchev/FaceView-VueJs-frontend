<template>
  <div class="panel panel-success">
    <div class="panel-heading">
      <h3 class="panel-title text-center">Register</h3>
    </div>
    <div v-if="error.message" class="alert alert-danger m text-center">
      {{ error.message }}
    </div>
    <form class="panel panel-body">
      <div class="form-group">
        <div class="row">
          <div class="col-md-6 m" :class="{invalid: $v.email.$error}">
            <input
              @blur="$v.email.$touch()"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter email">
            <small v-if="$v.email.$error" class="form-text text-muted error">Please enter a valid email</small>
          </div>
          <div class="col-md-6 m" :class="{invalid: $v.username.$error}">
            <input
              @blur="$v.username.$touch()"
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Enter username">
            <small v-if="$v.username.$error"  class="form-text text-muted error">This field cannot be empty</small>
          </div>
        </div>
      </div>
      <div class="form-group" :class="{invalid: $v.password.$error}">
        <label>Password</label>
        <input
          @blur="$v.password.$touch()"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password">
        <small v-if="$v.password.$error"  class="form-text text-muted error">This field cannot be empty</small>
      </div>
      <div class="form-group" :class="{invalid: $v.confirmPassword.$error}">
        <label>Confirm password</label>
        <input
          @input="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
          type="password"
          class="form-control"
          placeholder="Confirm Password">
        <small v-if="$v.confirmPassword.$error"  class="form-text text-muted error">Password mismatch</small>
      </div>
      <button :disabled="$v.$invalid" @click.prevent="register" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {required, email, sameAs} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        username: null,
        password: null,
        email: null,
        confirmPassword: null,
        errorMsg: null,
        error: {
          message: null
        }
      }
    },
    validations: {
      email: {
        required,
        email
      },
      username: {
        required
      },
      password: {
        required
      },
      confirmPassword:{
        required,
        sameAs: sameAs('password')
      }
    },
    methods: {
      register() {
        axios.post("/register", {
          username: this.username,
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.$store.dispatch("changeAuthView", 'app-login')

          })
          .catch(err => {
              let data = err.response.data;
              this.error.message = data.message
          })

      }
    }
  }
</script>

<style scoped>
  .invalid input {
    border: 1px solid red;
  }

  #emailHelp {
    color: #870a11;
  }

  .m{
    margin: 10px 0 10px 0;
  }
</style>
