import Formly from './formly'

export default {

    install (Vue, options) {

        if (!options) {
            options = {}
        }
        setOptions(options)

        /*
        |--------------------------------------------------------------------------
        | Form Global Data
        |--------------------------------------------------------------------------
        */

        let formly = new Formly(options)
        Vue.formly = formly
        Vue.prototype.$formly = formly

        /*
        |--------------------------------------------------------------------------
        | Form Components
        |--------------------------------------------------------------------------
        */

        Vue.component('v-input', require('./components/Input.vue'))
        Vue.component('v-input-locale', require('./components/InputLocale.vue'))
        Vue.component('v-delete-button', require('./components/DeleteButton.vue'))
        Vue.component('v-input-remove', require('./components/InputRemove.vue'))
        Vue.component('v-form-actions', require('./components/FormActions.vue'))
        Vue.component('v-form-language-selector', require('./components/LanguageSelector.vue'))
    }
}

function setOptions(options) {

    /*
    |--------------------------------------------------------------------------
    | Custom alert
    |--------------------------------------------------------------------------
    */
    if (options.hasOwnProperty('alert') && typeof options.alert == 'function' && options.alert.length == 2) {
        Vue._vueFormAlert = options.alert
    } else {
        Vue._vueFormAlert = function(message, level) {
            alert(message)
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Custom prompt
    |--------------------------------------------------------------------------
    */
    if (options.hasOwnProperty('prompt') && typeof options.prompt == 'function' && options.prompt.length == 2) {
        Vue._vueFormPrompt = options.prompt
    } else {
        Vue._vueFormPrompt = function(data, callback) {
            let answer = prompt(data.message);
            if (answer != null) {
                callback(answer)
            }
        }
    }
}
