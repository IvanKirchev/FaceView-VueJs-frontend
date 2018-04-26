<template>
  <div class="col-md-3 col-sm-6">
    <img :src="data" alt="">
  </div>
</template>

<script>
    export default {
      props:['data']
    }
</script>

<style scoped>
img{
  width: 100%;
}
</style>
