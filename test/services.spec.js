import argumentValidator from '../src/services/ArgumentValidator'
import { Form } from '../src/services/Form'
import moxios from 'moxios'
import expect from 'expect'
import store from '../src/store'
import FormPlugin from '../src/index'
import Vue from 'vue'

describe ('ArgumentValidator', () => {

	it('handles no options', () => {
		let args = argumentValidator(undefined)
		expect(args.schema).toMatchObject({})
	})

	it('handles undefined schema', () => {
		let args = argumentValidator({schema: undefined})
		expect(args.schema).toMatchObject({})
	})

	it('handles undefined data', () => {
		let args = argumentValidator({data: undefined})
		expect(args.data).toMatchObject({})
	})

	it('throw an exception if schema is not an object', () => {
		try {
			let args = argumentValidator({schema: 'asassa'})
			fail()
		} catch(e) {
			expect(e.message).toContain('Invalid argument')
		}
	})
})

describe ('Form', () => {

    let name = 'Carlos'
    let user_id = 5
    let client_name = 'John'
    let client_age = 18
    let category_name = 'Pizza'
    let category_type = 'food'
    let private_attributes = [
        'name',
        'age',
        'gender'
    ]

    let bigForm;

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
                        type: null,
                        private_attributes: null
                    }
                ]
            },
            data: {
                name: name,
                user_id: user_id,
                client: {
                    name: client_name,
                    age: client_age,
                    animal: {
                        race: 'Dog',
                        color: 'Brown'
                    }
                },
                categories: [
                    {
                        name: category_name,
                        type: category_type,
                        private_attributes: private_attributes
                    }
                ]
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
		expect(form.loading).toBe(false)
		expect(form.sendOnce).toBe(false)
	})

	it('loads when sending data', (done) => {
		let form = new Form({
			schema: {
				name: null
			}
		})
		form.post('/test').then(response => {
            expect(form.loading).toBeFalsy()
            expect(form.sendOnce).toBeTruthy()
            done()
        })

        expect(form.loading).toBeTruthy()
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
            expect(response.message).toBe('OK')
            done()
		})
	})

	it('sends nested and listed data', (done) => {
		
		bigForm.post('/test').then(response => {
            expect(response.message).toBe('OK')
            done()
		})
    })
    
    it('can send put request', (done) => {
		        
		bigForm.put('/test').then(response => {
            expect(response.message).toBe('OK')
            done()
		})
    })
    
    it('can send patch request', (done) => {
		        
		bigForm.patch('/test').then(response => {
            expect(response.message).toBe('OK')
            done()
		})
    })

    it('can send delete request', (done) => {
		        
		bigForm.delete('/test').then(response => {
            expect(response.message).toBe('OK')
            done()
		})
    })

    it('can create correct data', () => {
        let data = bigForm.getJsonData()
        expect(data.name).toBe(name)
        expect(data.user_id).toBe(user_id)
        expect(data.client.name).toBe(client_name)
        expect(data.client.age).toBe(client_age)
        expect(data.client.animal.race).toBe('Dog')
        expect(data.client.animal.color).toBe('Brown')
        expect(data.categories[0].name).toBe(category_name)
        expect(data.categories[0].type).toBe(category_type)
        expect(data.categories[0].private_attributes.constructor === Array).toBe(true)
        expect(data.categories[0].private_attributes).toBe(private_attributes)
    })

    it('it can find form elements', () => {
        expect(bigForm.get('name').value).toBe(name)
        expect(bigForm.get('client.name').value).toBe(client_name)
        expect(bigForm.get('categories.0.type').value).toBe(category_type)
    })

    it('it returns undefined if cannot find form elements', () => {
        expect(bigForm.get('age')).toBe(undefined)
        expect(bigForm.get('client.category')).toBe(undefined)
        expect(bigForm.get('client.categories.0.name')).toBe(undefined)
    })

    it('it handles errors', (done) => {
        moxios.stubRequest('/error', {
            status: 500,
            response: {
                message: 'Whoops!'
            }
        })
        bigForm.post('/error').catch(error => {
            expect(bigForm.loading).toBeFalsy()
            expect(bigForm.sendOnce).toBeTruthy()
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
            expect(bigForm.loading).toBeFalsy()
            expect(bigForm.sendOnce).toBeTruthy()
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
            expect(form.loading).toBeFalsy()
            expect(form.sendOnce).toBeTruthy()
            expect(store.state.locale).toBe('en')
            done()
        })
    })

    it('can create locale FormContainer', () => {
        let container = Vue.prototype.$form.input.locale()
        expect(container).toMatchObject({
            fr: null,
            en: null
        })
    })
})