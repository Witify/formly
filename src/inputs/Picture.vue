<template>
  <div class="picture-input" @click="open()" v-loading="loading" :class="{'is-empty': !hasImage}">
    <input ref="file-input" @change="onFileChange" type="file">
    <img v-if="hasImage" :src="image">
    <div v-else>
      <b-icon icon="file-image" size="is-large"></b-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mimes: {
      default() {
        return [
          'image/jpeg',
          'image/png'
        ]
      },
      type: Array
    },
    max: {
      default: (2 * 1024 * 1024)
    }
  },
  data() {
    return {
      loading: false,
      image: this.$parent.formElement.value
    }
  },
  computed: {
    formElement() {
      return this.$parent.formElement
    },
    hasImage() {
      return this.image != null && this.image != undefined
    }
  },
  methods: {
    open() {
      this.$refs['file-input'].click()
    },
    onFileChange(e) {
      this.loading = true
      let files = e.target.files || e.dataTransfer.files
      if (files.length && this.validateImage(files[0])) {
        this.createImage(files[0])
      } else {
        this.loading = false
      }
    },
    validateImage(file) {

      let rightMime = false
      for (let i = 0; i < this.mimes.length; i++) {
        if (file.type === this.mimes[i]) {
          rightMime = true
        }
      }

      if (! rightMime) {
        let message = ''
        for (let i = 0; i < this.mimes.length; i++) {
          message += (this.mimes[i] + ', ')
        }
        message = message.substring(0, message.length - 2)
        this.$toast.open({
          message: 'Picture must be of type ' + message,
          type: 'is-danger'
        })
        return false
      }

      if (file.size > this.max) {
        this.$toast.open({
          message: 'Picture size can not exceed ' + this.max / 1024 / 1024 + ' mb',
          type: 'is-danger'
        })
        return false
      }

      this.formElement.clearErrors()

      return true
    },
    uploadImage(file) {
      let formData = new FormData()
      formData.append('file', file)
      axios.post('/upload/temp', formData)
      .then(response => {
        this.formElement.value = response.data
        this.loading = false
      })
      .catch(error => {
        this.loading = false
      })
    },
    createImage(file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
        vm.uploadImage(file)
      }

      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../sass/main/variables';

  .picture-input {
    border: 2px dashed $grey-light;
    border-radius: $radius;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;

    &.is-empty {
      padding: 30px;
      width: 100%;
      text-align: center;
    }

    img {
      max-width: 100%;
    }

    input {
      display: none;
    }

    .icon {
      color: $grey-light;
    }
  }

  .picture-input:hover {
    border-color: $primary;
    .icon {
      color: $primary;
    }
  }
</style>