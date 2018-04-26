<template>
  <div class="row ">
    <div class="col-md-6 col-md-offset-3 wrapper">
      <form>
        <div class="form-group text-center">
          <label for="exampleTextarea">Whats on your mind?</label>
          <textarea v-model="content" class="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Add Image</label>
          <input style="display: none" @change="onFilePicked" ref="filePick" type="file" class="form-control-file">
          <button @click.prevent="onPickFile" class="btn btn-secondary">Upload</button>
          <img width="50%" :src="imageUrl" alt="">
          <button @click.prevent="clearImage" class="btn btn-secondary" v-if="imageUrl">Clear</button>
        </div>
        <button @click.prevent="createPost" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        content: '',
        imageUrl: null,
        image: null
      }
    },
    methods: {
      onPickFile() {
        this.$refs.filePick.click()
      },
      onFilePicked(event) {
        const files = event.target.files
        let fileName = files[0].name
        if (fileName.lastIndexOf('.') <= 0) return alert('choose a valid image')
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      clearImage() {
        this.image = null
        this.imageUrl = null
      },
      createPost() {
        let formData = new FormData
        formData.append('image', this.image)
        formData.append('content', this.content)
        axios.post("/posts/new", formData, {headers: {
          'Authorization': this.$store.getters.isAuth}})
          .then(res => {
            this.$emit('posted')
          })
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    margin-right: auto;
    margin-bottom: 5em;
  }
</style>
