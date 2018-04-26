<template>
    <div class="field">

        <!-- Label -->
        <slot name="label" :label="trueLabel">
            <label v-if="trueLabel" class="label" :for="name">
                <span v-if="locale" class="icon is-small"><i class="mdi mdi-earth"></i></span>
                <span>{{ trueLabel }}</span>
            </label>
        </slot>

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
        <slot name="errors" :errors="formElement.errors">
            <p v-for="(error, i) of formElement.errors" :key="i" class="help is-danger">{{ error }}</p>
        </slot>

        <!-- Helpblock -->
        <slot name="help" :help="helpText">
            <div v-if="helpText != ''" class="help">{{ helpText }}</div>
        </slot>

    </div>
</template>

<script>

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
      default: 'v-input-default'
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
  data () {
    return {
      form: {}
    }
  },
  created () {
    // Find parent form
    let parent = this.$parent
    while (parent.form === undefined) {
      parent = parent.$parent
      if (parent === undefined) {
        throw new Error("No parent found with a 'form' property")
      }
    }
    this.form = parent.form
  },
  computed: {
    formElement () {
      let element = this.form.get(this.name)
      if (element === undefined) {
        throw new Error('Undefined index: ' + this.name + ' was not found in form.data')
      } else if (element.$options === undefined) {
        throw new Error('Invalid index: ' + this.name + ' is not a Vue instance')
      } else if (element.$options !== undefined && element.$options.name !== 'FormElement') {
        throw new Error('Invalid index: ' + this.name + ' is not a FormElement')
      }
      return element
    },
    trueLabel () {
      if (this.label === undefined) {
        let parts = this.name.split('.')
        let last = parts.pop()
        return this.capitalize(last.replace(/_/g, ' ').toLowerCase())
      }
      return this.label
    }
  },
  methods: {
    getPlaceholder () {
      return this.placeholder
    },
    resetErrors () {
      this.formElement.clearErrors()
    },
    change () {
      this.$form.store.setMutated(true)
      this.resetErrors()
      this.$emit('change')
    },
    hasError () {
      return this.formElement.hasErrors()
    },
    capitalize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
