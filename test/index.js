import test from 'ava';
import Vue from 'vue'
import Formly from '../build'

test('create formly instance', t => {
	Vue.use(Formly, {
		locale: 'en'
	})
	t.is(Vue.formly, 'en')
});