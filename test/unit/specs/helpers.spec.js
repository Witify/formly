import { recursiveArrayToObject, arrayToObject } from '@/utils/helpers'

describe('helpers', () => {
  it('can convert array to object', () => {
    let data = {
      types: [
        {name: 'Love', categories: ['iron', 'gold']},
        {name: 'Peace', categories: ['gold']},
        {name: 'Test', categories: ['steel', 'gold']}
      ]
    }
    recursiveArrayToObject(data)
    expect(typeof data.types === 'object').to.be.truthy
    expect(data.types.constructor === Array).to.be.falsy
    expect(typeof data.types[0].categories === 'object').to.be.truthy
    expect(data.types[0].categories === Array).to.be.falsy
  })

  it('throws an error if incorrect type', () => {
    try {
      arrayToObject({asdas: 'asdasd'})
      // fail()
    } catch (e) {
      expect(e.message).to.include('must be an array')
    }
  })
})
