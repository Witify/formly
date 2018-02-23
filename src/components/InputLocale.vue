<template>
    <v-input 
      :name="name + '.' + state.locale" 
      :helpText="helpText" :label="getLabel" 
      :component="component" 
      :props="props" 
      locale
    ></v-input>
</template>

<script>

import { Form } from '../Form'
import store from '../store'

export default {
  props: {
    name: {
      required: true,
      type: String
    },
    helpText: {
      required: false,
      type: String
    },
    label: {
      required: false,
      type: String
    },
    component: {
      required: false,
      default: 'v-input-text'
    },
    props: {
      default () {
        return {}
      }
    }
  },
  data () {
      return {
          state: store.state
      }
  },
  computed: {
    getLabel () {
      if (this.label === undefined) {
        let parts = this.name.split('.')
        let last = parts.pop()
        return last.toLowerCase().capitalize()
      }
      return this.label
    }
  }
}
</script>
