import Vue from 'vue'
import store from './store'

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
      setState (state) {
        this.state = state
      },
      set (value) {
        this.value = value
        store.setMutated(true)
        this.setState('idle')
      },
      setErrors (errors) {
        this.errors = errors
        this.setState('error')
      },
      clearErrors () {
        this.errors = []
        this.setState('idle')
      },
      hasErrors () {
        return this.errors.length > 0
      }
    }
  })
}

export { FormElement }
