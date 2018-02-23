<template>
    <div class="form-section">
        <div class="form-actions">

            <v-form-language-selector class="is-inline"></v-form-language-selector>
            <a @click="back()" class="button is-grey">Cancel</a>
            <button class="button is-primary">Save</button>
            
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            locale: {
                default: false,
                type: Boolean
            }
        },
        methods: {
            save () {
                this.$emit('save')
            },
            back () {
                history.go(-1)
            }
        }
    }
</script>
