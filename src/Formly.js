import store from './store'
import { Form } from './Form'

class Formly  {

    constructor(options) {

        
        this.locale = options.locale
        this.locales = options.locales
        
        this.input = {
            locale() {
                let locales = {}
                Object.keys(options.locales).forEach(key => {
                    locales[key] = null
                })
                return locales
            }
        }

        this.store = store
        this.store.setLocale(this.locale)
    }

    create(args) {
        return new Form(args)
    }
}

export default Formly
