/*---------------------------------------------------
  * Form (Rapid Form creation class)
  * constructor arguments: 
  * - schema
  *
  * Schema represents how data is parsed
  *
  * {}   FormContainer (contains FormElements)
  * []   FormList (contains multiple FormContainers)
  * null FormElement (contains single value)
  *
----------------------------------------------------*/

/**
 * Argument validation
 * 
 * @param Object args 
 */
function formArgsValidation (args) {

  if (args === undefined) {
    args = {}
    args.schema = {}
  }

  if (args.schema === undefined) {
    args.schema = {}
  }
  if (typeof args.schema !== 'object') {
    throw new Error('Invalid argument: schema must be an object in Form constructor');
  }
  if (args.data === undefined) {
    args.data = {}
  }
  
  /**
   * Get rid of all arrays
   */
  recursiveArrayToObject(args.data)

  return args
}
    
import { FormContainer } from './FormContainer'
import { FormList } from './FormList'
import { FormElement } from './FormElement'
import { FormSuccess } from './FormSuccess'
import { FormFail } from './FormFail'

class Form {
  constructor (args) {
    // Validate arguments
    args = formArgsValidation(args)

    // Properties
    this.sendOnce = false
    this.loading = false
    this.mutated = false
    this.formFail = new FormFail(this)
    this.formSuccess = new FormSuccess(this)

    // Configurations
    this.config = {
      redirect: true
    }

    // Callbacks
    this.callbacks = {
      error: []
    }

    // Schema creation
    this.data = FormContainer(args.schema)
    
    // Fill data
    this.data.setData(args.data)
  }

  /**
   * Retrive all data from form as simple object
   */
  getJsonData() {
    return this.data.getData()
  }

  /**
   * Find the FormElement from a string in the form
   * 
   * @param String name
   */
  get (name) {
    let parts = name.split('.')
    let base = this.data
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i]
      if (base.$options.name === 'FormContainer') {
        base = base
      } else if (base.$options.name === 'FormList') {
        base = base.list
      } else if (base.$options.name ===  'FormElement') {
        return undefined
      }

      if (part in base) {
        base = base[part]
      }
    }

    return base
  }

  /**
   * Make a post request
   * 
   * @param String url 
   * @param Object data 
   */
  post(url, data = null) {
    return this.submit('post', url, data)
  }

  /**
   * Make a put request
   * 
   * @param String url 
   * @param Object data 
   */
  put(url, data = null) {
    return this.submit('put', url, data)
  }

  /**
   * Make a patch request
   * 
   * @param String url 
   * @param Object data 
   */
  patch(url, data = null) {
    return this.submit('patch', url, data)
  }

  /**
   * Make a delete request
   * 
   * @param String url 
   * @param Object data 
   */
  delete(url, data = null) {
    return this.submit('delete', url, data)
  }

  /**
   * Submit a request
   * 
   * @param String requestType [post, patch, put, delete] 
   * @param String url 
   * @param Object data 
   */
  submit(requestType, url, data = null) {
    this.loading = true
    return new Promise((resolve, reject) => {
      axios[requestType](url, data || this.getJsonData())
        .then(response => {
          this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch(error => {
          this.onFail(error.response)
          reject(error.response)
        })
    })
  }

  /**
   * Actions to do on successful request
   * 
   * @param Object response 
   */
  onSuccess(response) {
    this.sendOnce = true
    this.formSuccess.handle(response)
    this.loading = false
  }

  /**
   * Actions to do on failed request
   * 
   * @param Object response 
   */
  onFail(response) {
    if (! this.customErrors) {
      this.formFail.handle(response)
    }
    this.sendOnce = true
    this.loading = false
  }
}

export { Form }

/**
 * Recusively convert arrays in an object to objects
 * 
 * @param Object object
 * @return Object
 */
function recursiveArrayToObject(object) {
  Object.keys(object).forEach(function(key) {
    if (object[key] !== undefined && object[key] !== null && object[key].constructor === Array) {
      object[key] = arrayToObject(object[key])
    }

    if (object[key] !== undefined && object[key] !== null &&  typeof object[key] === 'object') {
      recursiveArrayToObject(object[key])
    }
  })
}

/**
 * Converts array to object
 * 
 * @param Array array
 * @return Object 
 */
function arrayToObject(array) {
  if (array.constructor !== Array) {
    throw new Error('Param of arrayToObject must be an array')
  }
  let obj = {}
  array.forEach(function (value, index) {
    obj[index] = value
  })
  return obj
}