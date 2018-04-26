<template>
  <div class="row content-container">
    <div class="col-md-5 col-md-offset-1">
      <div class="row info-box">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Town:</label>
          <div class="col-sm-10 col-md-6">
            <input v-model="townVal" type="text" v-if="showEditTown" class="form-control">
            <span v-if="!showEditTown">{{ town }}</span>
          </div>
          <div class="col-md-2">
            <button @click="editTown" v-if="showEditTown" class="btn btn-primary">Save</button>
          </div>
          <div class="col-md-2">
            <i @click="switchEditTown" class="fas fa-edit pull-right"></i>
          </div>
        </div>
      </div>
      <div class="row info-box">
        <div class="form-group row" :class="{invalid: $v.ageVal.$error}">
          <label class="col-sm-2 col-form-label">Age:</label>
          <div class="col-sm-10 col-md-6">
            <input
              @blur="$v.ageVal.$touch()"
              v-model="ageVal"
              type="number"
              v-if="showEditAge"
              class="form-control">
            <small v-if="$v.ageVal.$error" class="form-text text-muted error">Yoy have to be at least 12 years old</small>
            <span v-if="!showEditAge">{{ age }}</span>
          </div>
          <div class="col-md-2">
            <button :disabled="$v.$invalid" @click="editAge" v-if="showEditAge" class="btn btn-primary">Save</button>
          </div>
          <div class="col-md-2">
            <i @click="switchEditAge" class="fas fa-edit pull-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5 col-md-offset-1">
      <div class="row info-box">
        <div class="form-group row">
          <label class="col-md-4 col-form-label">Little about me:</label>
          <div class="col-sm-10 col-md-7">
            <textarea v-model="aboutVal" type="text" v-if="showEditAbout" class="form-control"></textarea>
            <button @click="editAbout" v-if="showEditAbout" class="btn btn-primary">Save</button>
            <span v-if="!showEditAbout">{{ about }}</span>
          </div>
          <div class="col-md-1">
            <i @click="switchEditAbout" class="fas fa-edit pull-right"></i>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {numeric, minValue} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        showEditAge: false,
        showEditTown: false,
        showEditAbout: false,
        ageVal: null,
        townVal: null,
        aboutVal: null
      }
    },
    methods: {
      switchEditTown() {
        this.showEditTown = !this.showEditTown;
        if (!this.showEditTown) {
          this.townVal = this.town
        }
      },
      switchEditAge() {
        this.showEditAge = !this.showEditAge;
        if (!this.showEditAge) {
          this.ageVal = this.age
        }
      },
      switchEditAbout() {
        this.showEditAbout = !this.showEditAbout;
        if (!this.showEditAbout) {
          this.aboutVal = this.about
        }
      },
      editAge() {
        axios.post("/users/edit", {
          age: this.ageVal,
          about: this.about,
          town: this.town
        }, {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(() => {
            this.showEditAge = false;
            this.$store.dispatch('refreshPic')
          })
      },
      editAbout() {
        axios.post("/users/edit", {
          age: this.age,
          about: this.aboutVal,
          town: this.town
        }, {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(() => {
            this.showEditAbout = false;
            this.$store.dispatch('refreshPic')
          })
      },
      editTown() {
        axios.post("/users/edit", {
          age: this.age,
          about: this.about,
          town: this.townVal
        }, {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(() => {
            this.showEditTown = false;
            this.$store.dispatch('refreshPic')
          })
      }
    },
    computed: {
      town() {
        this.townVal = this.$store.getters.getAboutInfo.town;
        return this.$store.getters.getAboutInfo.town
      },
      age() {
        this.ageVal = this.$store.getters.getAboutInfo.age;
        return this.$store.getters.getAboutInfo.age
      },
      about() {
        this.aboutVal = this.$store.getters.getAboutInfo.about;
        return this.$store.getters.getAboutInfo.about
      }
    },
    validations: {
      ageVal: {
        numeric,
        minValue: minValue(12)
      }
    }
  }
</script>

<style scoped>
  .content-container {
    background-color: #e3e3e5;
    position: relative;
    bottom: 7em;
  }

  @media screen and (max-width: 985px){
    .content-container {
      bottom: 0;
    }
  }

  .info-box {
    margin: 2em;
  }

  span {
    margin: 0 1em 0 1em;
  }

  input {
    width: 70%;
  }

  i {
    cursor: pointer;
  }

  div i:hover {
    color: darkgrey;
  }

  .invalid input {
    border: 1px solid red;
  }
</style>
