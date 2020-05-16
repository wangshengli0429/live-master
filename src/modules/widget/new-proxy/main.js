import Vue from 'vue';
import Main from './main.vue'


let NewProxyConstructor = Vue.extend(Main)

let instance;

const NewProxy = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
        NewProxy: options
	    }
	}
	instance = new NewProxyConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);

}

export default NewProxy
