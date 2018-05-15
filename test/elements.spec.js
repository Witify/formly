import { FormElement } from '../src/elements/FormElement'
import { FormList } from '../src/elements/FormList'
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

	it('can set value', () => {
		let element = FormElement()
		element.set('test value')
		expect(element.value).toBe('test value')
	})

	it('can clear errors', () => {
		let element = FormElement()
		element.setErrors(['required'])
		expect(element.state).toBe('error')
		expect(element.hasErrors()).toBeTruthy()
		element.clearErrors()
		expect(element.hasErrors()).toBeFalsy()
	})
})

describe ('FormList', () => {

	let schema = {
		name: null,
		category: null,
		age: null
	}

	it('defaults to an empty list', () => {
		let list = FormList(schema)
		expect(list.list).toMatchObject({})
	})

	it('can add an element', () => {
		let list = FormList(schema)
		list.add()
		expect(Object.keys(list.list).length).toBe(1)
		expect(list.list[Object.keys(list.list)[0]].name.$options.name).toBe('FormElement')
		expect(list.list[Object.keys(list.list)[0]].name.value).toBe(null)
	})

	it('can add multiple elements', () => {
		let list = FormList(schema)
		list.add(4)
		expect(Object.keys(list.list).length).toBe(4)
		expect(list.list[Object.keys(list.list)[3]].name.$options.name).toBe('FormElement')
		expect(list.list[Object.keys(list.list)[3]].name.value).toBe(null)
	})

	it('can remove an element', () => {
		let list = FormList(schema)
		list.add()
		expect(list.any()).toBeTruthy()
		list.remove(Object.keys(list.list)[0])
		expect(list.any()).toBeFalsy()
	})

	it('throws an exception if no key specified in remove method', () => {
		let list = FormList(schema)
		list.add()
		expect(list.any()).toBeTruthy()
		try {
			list.remove()
			fail()
		} catch(e) {
			expect(e.message).toContain('Unspecified key')
		}
	})
})