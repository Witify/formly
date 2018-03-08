import { FormService } from './Form'

import config, { setOptions } from './utils/config'

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

        Vue.component('v-input', require('./components/Input.vue'))
        Vue.component('v-input-locale', require('./components/InputLocale.vue'))
        Vue.component('v-form-language-selector', require('./components/LanguageSelector.vue'))
    }
}
