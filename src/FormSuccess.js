class FormSuccess {
  constructor (form) {
    this.form = form
  }
  handle(response) {
    Vue.formly.store.setMutated(false)

    if (response.redirect !== undefined && this.form.config.redirect) {
      window.location.replace(response.redirect)
    }
  }
}

export { FormSuccess }
