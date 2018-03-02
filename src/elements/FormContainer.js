import { FormElement } from './FormElement'
import { FormList } from './FormList'
import Vue from 'vue'

function FormContainer (schema) {

  let data = {}

  Object.keys(schema).map((key, index) => {
    
    // If a FormList (array)
    if (schema[key] !== null && schema[key].constructor === Array) {
      let listContainerSchema = schema[key][0]
      data[key] = FormList(listContainerSchema)
    }

    // If a FormContainer (object)
    else if (schema[key] !== null && typeof schema[key] === 'object') {
      data[key] = FormContainer(schema[key])
    }

    // If an FormElement (null)
    else {
      data[key] = FormElement()
    }
  })

  return new Vue({
    name: 'FormContainer',
    data () {
      return data
    },
    methods: {

      /**
       * Add data and generates the good Form Elements 
       * from the data attribute
       */
      setData (data) {
        Object.keys(this.$data).map((key, index) => {
          if (this.$data[key].$options.name === 'FormElement') {
            if (data[key] !== undefined) {
              this.$data[key].value = data[key]
            } else {
              this.$data[key].value = null
            }
          } else if (this.$data[key].$options.name === 'FormList' && data[key] !== undefined && typeof data[key] === 'object') {
            Object.keys(data[key]).map((i, i_) => {
              this.$data[key].setKey(i)
              this.$data[key].list[i].setData(data[key][i])
            })
          } else if (this.$data[key].$options.name === 'FormContainer' && data[key] !== undefined && typeof data[key] === 'object') {
            this.$data[key].setData(data[key])
          }
        })
      },

      /**
       * Retrieve the data as json
       */
      getData () {
        let _data = {}
        Object.keys(this.$data).map((key, index) => {
          if (this.$data[key].$options.name === 'FormElement') {
            _data[key] = this.$data[key].value
          } else if (this.$data[key].$options.name === 'FormList') {
            _data[key] = {}
            Object.keys(this.$data[key].list).map((i, i_) => {
              _data[key][i] = this.$data[key].list[i].getData()
            })
          } else if (this.$data[key].$options.name === 'FormContainer') {
            _data[key] = this.$data[key].getData()
          }
        })
        return _data
      }
    }
  })
}

export { FormContainer }