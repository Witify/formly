<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Vue Formly</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <form class="form" @submit.prevent="save()">
          <v-input name="name" help-text="Please enter your name">
            <!-- Custom label scope -->
            <label slot="label" slot-scope="{ label }" for="name" class="label">{{ label }} (custom html template)</label>
            <!-- Custom errors scope -->
            <template slot="errors" slot-scope="{ errors }">
              <p v-for="(error, i) of errors" :key="i" class="help is-danger">{{ error }} (custom html template)</p>
            </template>
            <!-- Custom help scope -->
            <template slot="help" slot-scope="{ help }">
              <p class="help is-info">{{ help }} (custom html template)</p>
            </template>
          </v-input>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.form = this.$form.create({
      schema: {
        name: ''
      }
    })

    // Manually set errors
    //this.form.get('name').setErrors(['This is required dude!'])
  },
  methods: {
    save () {
      console.log('save')
    }
  }
}
</script>
