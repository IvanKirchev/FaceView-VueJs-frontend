<template>
  <div class="col-md-5 col-sm-10 wrapper">
    <div class="pull-right remove">
      <i @click="removePost" class="fas fa-times"></i>
    </div>
    <router-link :to="'/users/' + data.authorID">
      <div class="row prof-container">
        <div class="col-md-2">
          <img class="profile-pic" :src="data.authorProfilePic" alt="">
        </div>
        <div class="col-md-7 m">
          {{data.authorUsername}}
        </div>
      </div>
    </router-link>
    <div class="row content">
      <p>{{this.cachedContent}}</p>
      <div v-if="showEdit" class="form-group">
        <textarea rows="3" v-model="cachedContent"></textarea>
        <button @click="saveEditedPost" class="btn btn-primary">Save</button>
        <button @click="rollBack" class="btn btn-secondary">Rollback</button>
      </div>
      <i @click="switchEdit" class="fas fa-edit pull-right"></i>
    </div>
    <small>{{new Date(data.createdOn).toUTCString()}}</small>
    <div class="row pic-wrapper">
      <img class="post-pic" :src="data.imageUrl" alt="">
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        showEdit: false,
        cachedContent: null
      }
    },
    props: ['data'],
    methods: {
      switchEdit() {
        this.showEdit = !this.showEdit
      },
      saveEditedPost() {
        this.data.content = this.cachedContent;
        axios.post("/posts/edit", {
          id: this.data.id,
          content: this.data.content
        },{
          headers: {'Authorization': this.$store.getters.isAuth}
        }).then(() => {
          this.showEdit = false
        })
      },
      rollBack() {
        this.cachedContent = this.data.content
        this.showEdit = false
      },
      removePost() {
        axios.get("/posts/remove/" + this.data.id,
          {headers: {'Authorization': this.$store.getters.isAuth}})
          .then(() => {
            this.$emit('remove', this.data.id)
          })
      }
    },
    created() {
      this.cachedContent = this.data.content
    }
  }
</script>

<style scoped>

  .profile-pic {
    border-radius: 50%;
    width: 3em;
  }

  .wrapper {
    padding: 1em 2em 1em 2em;
    margin: 1em 2em 1em 4em;
    border: 2px solid white;
    background-color: white;
  }

  .post-pic {
    width: 100%;
  }

  .content {
    margin: 2em 0 2em 0;
  }

  .prof-container {
    background-color: #f3f3f5;
  }

  .prof-container div:hover {

  }

  .m {
    margin-top: 1rem;
  }

  i {
    cursor: pointer;
  }

  textarea {
    width: 100%;
  }

  .remove {
    padding: 1rem;
  }

  .remove:hover {
    background-color: lightgrey;
  }
</style>
