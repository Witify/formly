import { FormContainer } from './FormContainer'
import Vue from 'vue'
import { deepCopy } from '../utils/helpers'

let config = {
  name: 'FormList',
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
      if (key === undefined) {
        throw new Error('Unspecified key in FormList.remove(int key)')
      }
      this.$delete(this.list, key)
    },

    /**
     * Check if list is empty
     * 
     * @return boolean
     */
    any () {
      return Object.keys(this.list).length > 0
    },

    /**
     * Set data unto a list
     * 
     * @param Object data
     * @return void
     */
    setData (data) {
      if (data !== undefined && typeof data === 'object') {
        Object.keys(data).map((i, i_) => {
          this.setKey(i)
          this.list[i].setData(data[i])
        })
      }
    },

    /**
     * Get Json data value
     * 
     * @return Object data
     */
    getData() {
      let data = {}
      Object.keys(this.list).map((i, i_) => {
        data[i] = this.list[i].getData()
      })
      return data
    }
  }
}

function FormList (schema) {
  config.data = function() {
    return {
      schema: deepCopy(schema),
      last: 0,
      list: {}
    }
  }
  return new Vue(config)
}

export { FormList }
