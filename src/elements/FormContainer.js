import { FormElement } from './FormElement'
import { FormList } from './FormList'
import Vue from 'vue'

function FormContainer (schema) {
  let data = {}

  Object.keys(schema).map((key, index) => {
    if (schema[key] !== null && schema[key].constructor === Array) {
      let listContainerSchema = schema[key][0]
      data[key] = FormList(listContainerSchema)
    } else if (schema[key] !== null && typeof schema[key] === 'object') {
      data[key] = FormContainer(schema[key])
    } else {
      data[key] = FormElement()
    }
  })

  return createFormContainer(data)
}

function createFormContainer(data) {
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
        if (data !== undefined && typeof data === 'object') {
          Object.keys(this.$data).map((key, index) => {
            this.$data[key].setData(data[key])
          })
        }
      },

      /**
       * Retrieve the data as json
       */
      getData () {
        let _data = {}
        Object.keys(this.$data).map((key, index) => {
          _data[key] = this.$data[key].getData()
        })
        return _data
      }
    }
  })
}

export { FormContainer }
