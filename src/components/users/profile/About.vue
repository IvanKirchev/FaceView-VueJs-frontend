<template>
  <div class="row content-container">
    <div class="col-md-5 col-md-offset-1">
      <div class="row info-box">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Town:</label>
          <div class="col-sm-10 col-md-6">
            <p>{{ town }}</p>
          </div>
        </div>
      </div>
      <div class="row info-box">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Age:</label>
          <div class="col-sm-10 col-md-6">
            <p>{{ age }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5 col-md-offset-1">
      <div class="row info-box">
        <div class="form-group row">
          <label class="col-md-4 col-form-label">Little about me:</label>
          <div class="col-sm-10 col-md-7">
            <p>{{ about }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        computed:{
          town(){
            return this.$store.getters.getInfo.searchTown
          },
          age(){
            return this.$store.getters.getInfo.searchAge
          },
          about(){
            return this.$store.getters.getInfo.searchAbout
          }
        }
    }
</script>

<style scoped>
  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 5em;
  }

  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }
  .info-box {
    margin: 2em;
  }
</style>
