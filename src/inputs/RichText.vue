<template>
  <quill-editor 
    ref="quillEditor"
    v-model="$parent.formElement.value"
    :options="editorOptions"
    :class="classes"
    @change="$emit('change')"
    >
  </quill-editor>
</template>

<script>
export default {
  props: {
    classes: {
      default: ''
    },
    toolbar: {
      type: Array,
      default() {
        return [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'header': [3, 4, 5, 6, false] }],
          [{ 'align': [] }],
          ['link'],
          ['image']
        ]
      }
    }
  },
  data() {
    return {
      editorOptions: {
        theme: 'snow',
        modules: {
          toolbar: this.toolbar
        },
        handlers: {
          image: this.imageHandler
        }
      }
    }
  },
  mounted() {
    this.$refs.quillEditor.quill.getModule("toolbar").addHandler("image", this.selectLocalImage)
  },
  methods: {
    selectLocalImage() {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.click()

      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0]

        // file type is only image.
        if (/^image\//.test(file.type)) {
          this.saveToServer(file)
        } else {
          console.warn('You could only upload images.')
        }
      }
    },
    saveToServer(file) {
      const formData = new FormData()
      formData.append('file', file)

      axios.post('/upload/rich_text_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
        const url = response.data
        this.insertToEditor(url)
      })
      .catch(error => {
        alert(error.response.data.errors.file[0])
      })
    },
    insertToEditor(url) {
      const range = this.$refs.quillEditor.quill.getSelection()
      this.$refs.quillEditor.quill.insertEmbed(range.index, 'image', url)
    }
  }
}
</script>
