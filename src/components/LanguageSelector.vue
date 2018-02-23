<template>
    <b-select icon="earth" v-model="state.locale">
        <option v-for="(locale, key) in $formly.locales" :value="key" :key="key">{{ locale }}</option>
    </b-select>
</template>

<script>

import store from '../store'

export default {
    data () {
        return {
            state: store.state
        }
    },
}
</script>
