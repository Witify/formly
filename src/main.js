import { FormService } from './Form'

import config, { setOptions } from './utils/config'

import Input from './components/Input.vue'
import InputLocale from './components/InputLocale.vue'
import LanguageSelector from './components/LanguageSelector.vue'
import InputDefault from './components/InputDefault.vue'

export default {

  install (Vue, options) {
    /*
        |--------------------------------------------------------------------------
        | Set Config Options
        |--------------------------------------------------------------------------
        */

    setOptions(Object.assign(config, options))

    /*
        |--------------------------------------------------------------------------
        | Prototypes
        |--------------------------------------------------------------------------
        */

    Vue.prototype.$form = new FormService()

    /*
        |--------------------------------------------------------------------------
        | Components
        |--------------------------------------------------------------------------
        */

    Vue.component('v-input', Input)
    Vue.component('v-input-locale', InputLocale)
    Vue.component('v-form-language-selector', LanguageSelector)
    Vue.component('v-input-default', InputDefault)
  }
}
