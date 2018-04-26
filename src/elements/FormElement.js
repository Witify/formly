import Vue from 'vue'
import store from '../store'

function FormElement () {
  return new Vue({
    name: 'FormElement',
    data () {
      return {
        value: null,
        state: 'idle',
        errors: []
      }
    },
    methods: {

      /**
       * Set state
       */
      setState (state) {
        this.state = state
      },

      /**
       * Set value
       */
      set (value) {
        this.value = value
        store.setMutated(true)
        this.setState('idle')
      },

      /**
       * Set errors
       */
      setErrors (errors) {
        this.errors = errors
        this.setState('error')
      },

      /**
       * Clear the errors
       */
      clearErrors () {
        this.errors = []
        this.setState('idle')
      },

      /**
       * Check if has errors
       */
      hasErrors () {
        return this.errors.length > 0
      }
    }
  })
}

export { FormElement }
