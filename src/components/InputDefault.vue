<template>
  <input
    class="input"
    :type="type"
    @input="$emit('change')"
    v-model="$parent.formElement.value"
    :placeholder="placeholder"
    :class="{'is-danger': $parent.hasError()}">
</template>

<script>
export default {
  props: {
    icon: {
      default: undefined,
      type: String
    },
    placeholder: {
      type: String
    },
    type: {
      default: 'text',
      type: String
    }
  },
  computed: {
    status () {
      if (this.$parent.hasError()) {
        return 'is-danger'
      }
      return ''
    }
  }
}
</script>
