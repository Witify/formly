# Sprintify Formly

<p>
      <a href="https://travis-ci.org/Witify/formly"><img src="https://travis-ci.org/Witify/formly.svg?branch=master" alt="build:passed"></a>
    <a href="https://codeclimate.com/github/Witify/formly/maintainability"><img src="https://api.codeclimate.com/v1/badges/fa6a2944147990456773/maintainability"/></a>
    <a href="https://codeclimate.com/github/Witify/formly/test_coverage"><img src="https://api.codeclimate.com/v1/badges/fa6a2944147990456773/test_coverage"/></a>
</p>

Sprintify is a lightweight Vue plugin that makes reactive form creation a cinch.

## Installation

### 1. Instal via npm
```bash
npm install sprintify-formly
```

### 2. Import and use Sprintify Formly
```javascript
import Vue from 'vue'
import Form from 'sprintify-formly'

Vue.use(Form)
```

## Quick start

You can create a simple form this way:

```html
<form @submit.prevent="send()">
    <v-input name="firstname"></v-input>
    <v-input name="lastname"></v-input>
    <v-input name="age"></v-input>
</form>
```

```javascript
export default {
    data () {
        return {
            form: this.$form.create({
                schema: {
                    firstname: null,
                    lastname: null,
                    age: null
                }
            })
        }
    },
    methods: {
        send () {
            this.form.post('/admin/user')
            .then(response => {
                alert('User successfully created!')
            })
            .catch(error => {
                alert('Whoops!')
            })
        }
    }
}
```

### Dynamic Lists

To generate dynamic lists, you proceed like this:
```html
<form @submit.prevent="send()">
    <button @click="form.tags.add()">Add a new tag</button>
    <div v-for="(tag, i) in form.tags.list">
        <v-input :name="'tags.' + i + '.name'"></v-input>
        <v-input :name="'tags.' + i + '.category'"></v-input>
        <button @click="form.tags.remove(i)">Remove this tag</button>
    </div>
</form>
```

```javascript
export default {
    data () {
        return {
            form: this.$form.create({
                schema: {
                    tags: [
                        {
                            name: null,
                            category: null
                        }
                    ]
                }
            })
        }
    }
}
```
To add an element to a list: `form.tags.add()`.

To remove an element from a list: `form.tags.remove(i)`.

## Documentation

### Configuration

```javascript
Vue.use(Form, {
    locales: {"en": "English", "fr": "Français"}, // All app's locales
    locale: "en", // Default locale
    onFormSuccess: onSuccess, // callback when a form makes a successful request
    onFormFail: onFail // callback when a form makes a failed request
})
```

### Set custom data

You can set custom data for each field this way:
```javascript
export default {
    data () {
        return {
            form: this.$form.create({
                schema: {
                    firstname: null,
                    tags: [
                        {
                            name: null,
                            category: null
                        }
                    ]
                },
                data: {
                    firstname: 'John',
                    tags: [
                        {name: "red", category: "color"},
                        {name: "blue", category: "color"}
                    ]
                }
            })
        }
    }
}
```


## License

Code released under MIT license.

Copyright (c) 2018, François Lévesque.
