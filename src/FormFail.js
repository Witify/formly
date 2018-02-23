import formFailValidation from './FormFailValidation'

class FormFail {
  constructor(form) {
    this.form = form
    this.statusActions = {
      "^401$": "unauthorizedError",
      "^403$": "forbiddenError",
      "^404$": "notFoundError",
      "^422$": "validationError",
      "^423$": "lockedError",
      "^4[0-9][0-9]$": "badRequestError",
      "^5[0-9][0-9]$": "serverError"
    }
  }

  handle(response) {
    this.response = response
    this.matchStatus()
  }

  matchStatus() {
    if (this.response === undefined) {
      this.defaultError()
      return
    }

    let status = this.response.status
    for (let regex in this.statusActions) {
      let regExp = new RegExp(regex)
      if (regExp.test(status)) {
        let action = this.statusActions[regex]
        if (this.form.callbacks.error[action] !== undefined) {
          this.form.callbacks.error[action](this.response)
        } else {
          this[action]()
        }
        return
      }
    }

    this.defaultError()
  }

  getMessage(defaultMessage = '') {
    if (this.response.data.errors !== undefined) {
      return this.response.data.errors.message
    }
    return defaultMessage
  }

  defaultError() {
    this.serverError()
  }

  validationError() {
    formFailValidation(this.form, this.response.data.errors)
  }

  serverError() {
    Vue._vueFormAlert('Oops! Something went wrong!', 'is-danger')
  }

  badRequestError() {
    let message = this.getMessage("Bad request")
    Vue._vueFormAlert(message, 'is-danger')
  }

  unauthorizedError() {
    let message = this.getMessage("Unauthorized action")
    Vue._vueFormAlert(message, 'is-danger')
  }

  forbiddenError() {
    let message = this.getMessage("Forbidden action")
    Vue._vueFormAlert(message, 'is-danger')
  }

  notFoundError() {
    let message = this.getMessage("Page not found")
    Vue._vueFormAlert(message, 'is-danger')
  }

  lockedError() {
    Vue._vueFormAlert(this.response.data['email'], 'is-danger')
  }
}

export { FormFail }