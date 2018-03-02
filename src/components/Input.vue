<template>
    <div class="field">

        <!-- Label -->
        <label v-if="getLabel()" class="label" :for="name">
            <span v-if="locale" class="icon is-small"><i class="mdi mdi-earth"></i></span>
            <span>{{ getLabel() }}</span>
        </label>

        <!-- Input Field -->
        <component
            :is="component"
            v-bind="$props.props"
            v-model="formElement.value"
            @change="change()"
            @input="change()"
        >
        </component>
        
        <!-- Errors -->
        <p v-for="(error, i) of formElement.errors" :key="i" class="help is-danger">{{ error }}</p>

        <!-- Helpblock -->
        <div v-if="helpText != ''" class="help">{{ helpText }}</div>

    </div>
</template>

<script>

import { Form } from '../services/Form'

export default {
    props: {
        name: {
            required: true,
            type: String
        },
        helpText: {
            required: false,
            type: String
        },
        label: {
            required: false,
            type: String
        },
        component: {
            required: false,
            default: 'v-input-text'
        },
        locale: {
            default: false,
            type: Boolean
        },
        props: {
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            form: {}
        }
    },
    created() {
        // Find parent form
        let parent = this.$parent
        while (parent.form === undefined) {
            parent = parent.$parent
            if (parent === undefined) {
                throw new Error("No parent found with a 'form' property")
                return
            }
        }
        this.form = parent.form
    },
    computed: {
        formElement() {
            let element = this.form.get(this.name)
            if (element === undefined) {
                throw new Error('Undefined index: ' + this.name + ' was not found in form.data')
            } else if (element.$options === undefined) {
                throw new Error('Invalid index: ' + this.name + ' is not a Vue instance')
            } else if (element.$options !== undefined && element.$options.name !== 'FormElement') {
                throw new Error('Invalid index: ' + this.name + ' is not a FormElement')
            }
            return element
        }
    },
    methods: {
        getLabel() {
            if (this.label === undefined) {
                if (__('label.' + this.name) !== null) {
                    return __('label.' + this.name)
                }

                let parts = this.name.split('.')
                let last = parts.pop()
                return last.replace(/_/g, " ").toLowerCase().capitalize()
            }
            return this.label
        },
        getPlaceholder() {
            return this.placeholder
        },
        resetErrors() {
            this.formElement.clearErrors()
        },
        change() {
            this.$form.store.setMutated(true)
            this.resetErrors()
            this.$emit('change')
        },
        hasError() {
            return this.formElement.hasErrors()
        }
    }
}
</script>
