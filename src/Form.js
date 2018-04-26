import store from './store'
import { Form } from './services/Form'
import config from './utils/config'

class FormService {
  constructor () {
    this.config = config

    this.input = {
      locale () {
        let locales = {}
        Object.keys(config.locales).forEach(key => {
          locales[key] = null
        })
        return locales
      }
    }

    this.store = store
    this.store.setLocale(config.locale)
  }

  create (args) {
    return new Form(args)
  }
}

export { FormService }
