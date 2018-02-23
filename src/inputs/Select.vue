<template>

  <b-select
    v-model="$parent.formElement.value"
    :placeholder="placeholder"
    :multiple="multiple"
    :native-size="size"
    :disabled="disabled"
    @input="$emit('change')"
  >
    <option v-for="opt in options"
      :value="opt[valueKey]"
      :key="opt[valueKey]">
      {{ opt[labelKey] }}
    </option>
  </b-select>

</template>

<script>
export default {
  created() {
    if (this.multiple && (this.$parent.formElement.value === undefined || this.$parent.formElement.value === null)) {
      this.$parent.formElement.set([]) 
    }
  },
  props: {
    options: {
      required: true,
      type: Array
    },
    multiple: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    size: {
      default() {
        return (this.multiple) ? 3 : 1
      },
      type: Number
    },
    labelKey: {
      default: 'label',
      type: String
    },
    valueKey: {
      default: 'value',
      type: String
    },
    placeholder: {
      type: String
    }
  }
}
</script>
