<template>
    <div>
        <div class="select">
            <select v-model="state.locale">
                <option v-for="(locale, key) in $form.config.locales" :value="key" :key="key">{{ locale }}</option>
            </select>
        </div>
    </div>
</template>

<script>

import store from '../store'

export default {
  data () {
    return {
      state: store.state
    }
  }
}
</script>
