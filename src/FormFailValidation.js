import store from './store'

export default function(form, errors) {
  form.langError = null
  let errorFound = false

  Object.keys(errors).map((key, index) => {

    errorFound = true

    let formElement = form.get(key)

    if (formElement === undefined) {
      Vue._vueFormAlert(errors[key], 'is-danger')
      return
    }

    formElement.errors = errors[key]
    formElement.state = 'danger'
    
    checkIfLanguageError(key)
  })
  
  if (errorFound) {
    window.scrollTo(0,0)
    Vue._vueFormAlert('Please verify your input', 'is-danger')
  }
}

function checkIfLanguageError(key) {
  Object.keys(Vue.formly.locales).map((i, index) => {
    if (key.includes('.' + i)) {
      store.setLocale(i)
    }
  })
}
