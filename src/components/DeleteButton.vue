<template>
  <div @click="prompt()" class="button is-danger" :class="classes" :loading="form.loading">Delete</div>
</template>

<script>
  import { Form } from '../Form'

  export default {
    props: {
      url: {
        required: true,
        type: String
      },
      classes: {
        required: false,
        type: String
      }
    },
    data() {
      return {
        form: new Form({
          schema: {}
        })
      }
    },
    methods: {
      prompt() {
        this.$dialog.confirm({
          title: 'Delete the record',
          message: 'This will permanently delete the record. Continue?',
          confirmText: 'Delete the record',
          type: 'is-danger',
          hasIcon: false,
          onConfirm: () => this.destroy()
        })
      },

      destroy() {
        this.form.delete(this.url)
      }
    }
  }
</script>
