<template>
    <b-input 
        :type="type"
        @input="$emit('change')"
        v-model="$parent.formElement.value" 
        :placeholder="placeholder"
        :icon="icon"
        :class="{'is-danger': $parent.hasError()}"
    >
    </b-input>
</template>

<script>
export default {
    props: {
        icon: {
            default: undefined,
            type: String
        },
        placeholder: {
            type: String
        },
        type: {
            default: "text",
            type: String
        }
    },
    computed: {
        status() {
            if ($parent.hasError()) {
                return 'is-danger'
            }
            return ''
        }
    }
}
</script>
