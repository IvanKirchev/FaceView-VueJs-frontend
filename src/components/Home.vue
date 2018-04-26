<template>
  <div class="row">
    <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <transition name="flip" mode="out-in">
        <component :is="authView"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import AppLogin from './auth/Login.vue'
  import AppRegister from './auth/Register.vue'

  export default {
    data() {
      return {
        currant: 'app-register'
      }
    },
    components: {
      AppLogin,
      AppRegister
    },
    methods: {
      switchView(view) {
        this.currant = view
      }
    },
    computed: {
      authView(){
        return this.$store.getters.authView
      }
    },
    created(){
    }
  }
</script>

<style>
  body {
    padding: 30px;
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
