import { FormElement } from '@/elements/FormElement'
import { FormList } from '@/elements/FormList'

describe('FormElement', () => {
  it('value defaults to a null value', () => {
    let element = FormElement()
    console.log(expect)
    expect(element.value).to.equal(null)
  })

  it('state defaults to idle', () => {
    let element = FormElement()
    expect(element.state).to.equal('idle')
  })

  it('can set errors', () => {
    let element = FormElement()
    expect(element.state).to.equal('idle')
    element.setErrors(['required'])
    expect(element.state).to.equal('error')
    expect(element.hasErrors()).to.be.truthy
  })

  it('can set value', () => {
    let element = FormElement()
    element.set('test value')
    expect(element.value).to.equal('test value')
  })

  it('can clear errors', () => {
    let element = FormElement()
    element.setErrors(['required'])
    expect(element.state).to.equal('error')
    expect(element.hasErrors()).to.be.truthy
    element.clearErrors()
    expect(element.hasErrors()).to.be.falsy
  })
})

describe('FormList', () => {
  let schema = {
    name: null,
    category: null,
    age: null
  }

  it('defaults to an empty list', () => {
    let list = FormList(schema)
    expect(list.list).to.deep.equal({})
  })

  it('can add an element', () => {
    let list = FormList(schema)
    list.add()
    expect(Object.keys(list.list).length).to.equal(1)
    expect(list.list[0].name.$options.name).to.equal('FormElement')
    expect(list.list[0].name.value).to.equal(null)
  })

  it('can add multiple elements', () => {
    let list = FormList(schema)
    list.add(4)
    expect(Object.keys(list.list).length).to.equal(4)
    expect(list.list[3].name.$options.name).to.equal('FormElement')
    expect(list.list[3].name.value).to.equal(null)
  })

  it('returns the correct last key', () => {
    let list = FormList(schema)
    expect(list.lastKey).to.equal('-1')
    list.add(4)
    expect(Object.keys(list.list).length).to.equal(4)
    expect(list.lastKey).to.equal('3')
  })

  it('can remove an element', () => {
    let list = FormList(schema)
    list.add()
    expect(list.any()).to.be.truthy
    list.remove(0)
    expect(list.any()).to.be.falsy
  })

  it('throws an exception if no key specified in remove method', () => {
    let list = FormList(schema)
    list.add()
    expect(list.any()).to.be.truthy
    try {
      list.remove()
      // fail()
    } catch (e) {
      expect(e.message).to.include('Unspecified key')
    }
  })
})
