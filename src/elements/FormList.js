import { FormContainer } from './FormContainer'
import Vue from 'vue'

function FormList (schema) {
  return new Vue({
    name: 'FormList',
    data () {
      return {
        schema: deepCopy(schema),
        last: 0,
        list: {}
      }
    },
    computed: {
      lastKey () {
        return (this.last - 1).toString()
      }
    },
    methods: {
      
      /**
       * Append a multiple containers to the list
       */
      add (n = 1) {
        for (let i = 0; i < n; i++) {
          this.addOne()
        }
      },

      /**
       * Append a container to the list
       */
      addOne () {
        let container = FormContainer(this.schema)
        this.$set(this.list, this.last, container)
        this.last++
      },

      /**
       * Set a specific numeric key to the list
       * 
       * @param string key 
       */
      setKey (key) {
        let container = FormContainer(this.schema)
        this.$set(this.list, key, container)
        if (key >= this.last) {
          this.last = parseInt(key) + 1
        }
      },

      /**
       * Remove a specific key from the list
       * 
       * @param string key 
       */
      remove (key) {
        this.$delete(this.list, key)
      },

      /**
       * Check if list is empty
       * 
       * @return boolean
       */
      any () {
        return Object.keys(this.list).length > 0
      }
    }
  })
}

export { FormList }
