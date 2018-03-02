import store from '../store'
import config from '../utils/config'

class FormSuccess {

  constructor(form) {
    this.form = form
  }

  /**
   * Handles a form success
   */
  handle(response) {

    // Set form as "not mutated"
    store.setMutated(false)

    // Call custom handler
    config.onFormSuccess(response)
  }
}

export { FormSuccess }
