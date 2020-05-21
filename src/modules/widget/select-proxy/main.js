import Vue from 'vue';
import Main from './Main.vue'

let SelectProxyConstructor = Vue.extend(Main)

let instance;

const SelectProxy = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
        SelectProxy: options
	    }
	}

	instance = new SelectProxyConstructor({
    	data: options
  	});

  	document.getElementById('app').appendChild(instance.$mount().$el);
}
export default SelectProxy
