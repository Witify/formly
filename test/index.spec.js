import expect from 'expect'
import Vue from 'vue'
import Form from '../src/index'
import moxios from 'moxios'
import sinon from 'sinon'

describe ('config', () => {

    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
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

        expect(Vue.prototype.$form).not.toBe(undefined)
        expect(Vue.prototype.$form.config).not.toBe(undefined)
        expect(Vue.prototype.$form.config.locales).toMatchObject(locales)
        expect(Vue.prototype.$form.config.locale).toBe('fr')
        
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
            expect(onSuccess.callCount).toBe(1)
            
            moxios.stubRequest('/error', {
                status: 500,
                response: {
                    message: 'OK'
                }
            })
            form.post('/error').catch(error => {
                expect(onFail.callCount).toBe(1)
                done()
            })
        })
        
    })
})