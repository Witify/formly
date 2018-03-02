import store from '../store'
import config from '../utils/config'

export default function(form, errors) {
  Object.keys(errors).map((key, index) => {
    // Find the correct FormElement
    let formElement = form.get(key)
    
    // Set the error
    formElement.setErrors(errors[key])
    
    // Set correct language in store
    checkIfLanguageError(key)
  })
}

/**
 * Set Locale in state if an error in 
 * a locale-input is found
 * 
 * @param {string} key Local key
 */
function checkIfLanguageError(key) {
  Object.keys(config.locales).map((i, index) => {
    if (key.includes('.' + i)) {
      store.setLocale(i)
    }
  })
}
