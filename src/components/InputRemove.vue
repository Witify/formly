<template>
  <div class="box">
    <a class="delete" @click="prompt()"></a>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    methods: {
      prompt() {
        this.$dialog.confirm({
          title: 'Delete the record',
          message: 'This will permanently delete the record. Continue?',
          confirmText: 'Delete the record',
          type: 'is-danger',
          onConfirm: () => this.$emit('remove')
        })
      },
    }
  }
</script>
