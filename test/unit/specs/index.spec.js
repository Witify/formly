import Vue from 'vue'
import Form from '@/main'
import moxios from 'moxios'
import sinon from 'sinon'

describe('config', () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })

  it('can set configs', (done) => {
    var onSuccess = sinon.spy()
    var onFail = sinon.spy()

    let locales = {
      'fr': 'Français',
      'en': 'English'
    }

    Vue.use(Form, {
      locales: locales,
      locale: 'fr',
      onFormSuccess: onSuccess,
      onFormFail: onFail
    })

    expect(Vue.prototype.$form).not.to.equal(undefined)
    expect(Vue.prototype.$form.config).not.to.equal(undefined)
    expect(Vue.prototype.$form.config.locales).to.deep.equal(locales)
    expect(Vue.prototype.$form.config.locale).to.equal('fr')

    let form = Vue.prototype.$form.create({
      name: null
    })
    moxios.stubRequest('/test', {
      status: 200,
      response: {
        message: 'OK'
      }
    })
    form.post('/test').then(response => {
      expect(onSuccess.callCount).to.equal(1)
      moxios.stubRequest('/error', {
        status: 500,
        response: {
          message: 'OK'
        }
      })
      form.post('/error').catch(error => {
        expect(onFail.callCount).to.equal(1)
        done()
      })
    })
  })
})
