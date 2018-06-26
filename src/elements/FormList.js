import { FormContainer } from './FormContainer'
import Vue from 'vue'
import { deepCopy, uuid } from '../utils/helpers'

let config = {
  name: 'FormList',
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
      let key = (+new Date()) + '-' + uuid(32)
      this.$set(this.list, key, container)
    },

    /**
     * Set a specific numeric key to the list
     * 
     * @param string key 
     */
    setKey (key) {
      let container = FormContainer(this.schema)
      this.$set(this.list, key, container)
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
      list: {}
    }
  }
  return new Vue(config)
}

export { FormList }
