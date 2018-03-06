import { recursiveArrayToObject, arrayToObject } from '../src/utils/helpers'
import expect from 'expect'

describe ('helpers', () => {

	it('can convert array to object', () => {
		let data = {
			types: [
				{name: 'Love', categories: ['iron', 'gold']},
				{name: 'Peace', categories: ['gold']},
				{name: 'Test', categories: ['steel', 'gold']},
			]
		}
		recursiveArrayToObject(data)
		expect(typeof data.types === 'object').toBeTruthy()
		expect(data.types.constructor == Array).toBeFalsy()
		expect(typeof data.types[0].categories === 'object').toBeTruthy()
		expect(data.types[0].categories == Array).toBeFalsy()
	})

	it('throws an error if incorrect type', () => {
		try {
			arrayToObject({asdas: 'asdasd'})
			fail()
		} catch (e) {
			expect(e.message).toContain('must be an array')
		}
	})
})