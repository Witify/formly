import argumentValidator from '@/services/ArgumentValidator'
import { Form } from '@/services/Form'
import moxios from 'moxios'
import store from '@/store'
import Vue from 'vue'

describe('ArgumentValidator', () => {
  it('handles no options', () => {
    let args = argumentValidator(undefined)
    expect(args.schema).to.deep.equal({})
  })

  it('handles undefined schema', () => {
    let args = argumentValidator({schema: undefined})
    expect(args.schema).to.deep.equal({})
  })

  it('handles undefined data', () => {
    let args = argumentValidator({data: undefined})
    expect(args.data).to.deep.equal({})
  })

  it('throw an exception if schema is not an object', () => {
    try {
      // fail()
    } catch (e) {
      expect(e.message).to.include('Invalid argument')
    }
  })

  it('coverts arrays to objects', () => {
    let args = argumentValidator({
      schema: {
        categories: [
          {
            name: null
          }
        ]
      },
      data: {
        categories: [
          {name: 'love'},
          {name: 'test'}
        ]
      }
    })
    expect(typeof args.data.categories === 'object').to.be.truthy
    expect(args.data.categories.constructor === Array).to.be.falsy
  })
})

describe('Form', () => {
  let name = 'Carlos'
  let userId = 5
  let clientName = 'John'
  let clientAge = 18
  let categoryName = 'Pizza'
  let categoryType = 'food'

  let bigForm

  beforeEach(() => {
    bigForm = new Form({
      schema: {
        name: null,
        user_id: null,
        client: {
          name: null,
          age: null,
          animal: {
            race: null,
            color: null
          }
        },
        categories: [
          {
            name: null,
            type: null
          }
        ]
      },
      data: {
        name: name,
        user_id: userId,
        client: {
          name: clientName,
          age: clientAge,
          animal: {
            race: 'Dog',
            color: 'Brown'
          }
        },
        categories: {
          0: {
            name: categoryName,
            type: categoryType
          }
        }
      }
    })
    moxios.install()
    moxios.stubRequest('/test', {
      status: 200,
      response: {
        message: 'OK'
      }
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('does not load when idle', () => {
    let form = new Form({
      schema: {
        name: null
      }
    })
    expect(form.loading).to.be.false
    expect(form.sendOnce).to.be.false
  })

  it('loads when sending data', (done) => {
    let form = new Form({
      schema: {
        name: null
      }
    })
    form.post('/test').then(response => {
      expect(form.loading).to.be.falsy
      expect(form.sendOnce).to.be.truthy
      done()
    })

    expect(form.loading).to.be.truthy
  })

  it('sends simple data (1 attribute)', (done) => {
    let name = 'Carlos'
    let form = new Form({
      schema: {
        name: null
      }
    })

    form.data.name.set(name)

    form.post('/test').then(response => {
      expect(response.message).to.equal('OK')
      done()
    })
  })

  it('sends nested and listed data', (done) => {
    bigForm.post('/test').then(response => {
      expect(response.message).to.equal('OK')
      done()
    })
  })

  it('can send put request', (done) => {
    bigForm.put('/test').then(response => {
      expect(response.message).to.equal('OK')
      done()
    })
  })

  it('can send patch request', (done) => {
    bigForm.patch('/test').then(response => {
      expect(response.message).to.equal('OK')
      done()
    })
  })

  it('can send delete request', (done) => {
    bigForm.delete('/test').then(response => {
      expect(response.message).to.equal('OK')
      done()
    })
  })

  it('can create correct data', () => {
    let data = bigForm.getJsonData()
    expect(data.name).to.equal(name)
    expect(data.user_id).to.equal(userId)
    expect(data.client.name).to.equal(clientName)
    expect(data.client.age).to.equal(clientAge)
    expect(data.client.animal.race).to.equal('Dog')
    expect(data.client.animal.color).to.equal('Brown')
    expect(data.categories[0].name).to.equal(categoryName)
    expect(data.categories[0].type).to.equal(categoryType)
  })

  it('it can find form elements', () => {
    expect(bigForm.get('name').value).to.equal(name)
    expect(bigForm.get('client.name').value).to.equal(clientName)
    expect(bigForm.get('categories.0.type').value).to.equal(categoryType)
  })

  it('it returns undefined if cannot find form elements', () => {
    expect(bigForm.get('age')).to.equal(undefined)
    expect(bigForm.get('client.category')).to.equal(undefined)
    expect(bigForm.get('client.categories.0.name')).to.equal(undefined)
  })

  it('it handles errors', (done) => {
    moxios.stubRequest('/error', {
      status: 500,
      response: {
        message: 'Whoops!'
      }
    })
    bigForm.post('/error').catch(error => {
      expect(bigForm.loading).to.be.falsy
      expect(bigForm.sendOnce).to.be.truthy
      done()
    })
  })

  it('it handles validation errors', (done) => {
    moxios.stubRequest('/validation', {
      status: 422,
      response: {
        message: 'Whoops!'
      }
    })
    bigForm.post('/validation')
      .catch(error => {
        expect(bigForm.loading).to.be.falsy
        expect(bigForm.sendOnce).to.be.truthy
        done()
      })
  })

  it('it changes locale on validation error', (done) => {
    moxios.stubRequest('/validation', {
      status: 422,
      response: {
        errors: {
          'name.en': 'required'
        }
      }
    })

    let form = Vue.prototype.$form.create({
      schema: {
        name: {
          fr: null,
          en: null
        }
      },
      data: {
        name: {
          fr: 'Rouge',
          en: null
        }
      }
    })

    form.post('/validation')
      .catch(error => {
        expect(form.loading).to.be.falsy
        expect(form.sendOnce).to.be.truthy
        expect(store.state.locale).to.equal('en')
        done()
      })
  })

  it('can create locale FormContainer', () => {
    let container = Vue.prototype.$form.input.locale()
    expect(container).to.deep.equal({
      fr: null,
      en: null
    })
  })
})
