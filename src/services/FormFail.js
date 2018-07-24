import formFailValidation from './FormFailValidation'
import config from '../utils/config'

class FormFail {

  constructor(form) {
    this.form = form
  }

  /**
   * Handle the error
   */
  handle(response) {
    
    // Validation error
    if (response && response.status == 422) {
      let errors = config.onFormFailValidation(response)
      formFailValidation(this.form, errors)
    }

    // Call custom handler
    config.onFormFail(response)
  }
}

export { FormFail }