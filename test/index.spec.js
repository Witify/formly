import { mount } from 'vue-test-utils'
import { FormElement } from '../src/elements/FormElement'
import { Form } from '../src/services/Form'
import expect from 'expect'

describe ('FormElement', () => {

	it('value defaults to a null value', () => {
		let element = FormElement()
		expect(element.value).toBe(null)
	})

	it('state defaults to idle', () => {
		let element = FormElement()
		expect(element.state).toBe('idle')
	})

	it('can set errors', () => {
		let element = FormElement()
		expect(element.state).toBe('idle')
		element.setErrors(['required'])
		expect(element.state).toBe('error')
		expect(element.hasErrors()).toBeTruthy()
	})
})

describe ('Form', () => {

	it('can create a form', () => {
		let form = new Form({
			schema: {
				name: null
			}
		})
		form.post('http://google.com')
		expect(form.loading).toBe(true)
	})
})