import Vue from 'vue';
import Main from './main.vue'


let PlatFormEntryConstructor = Vue.extend(Main)

let instance;

const platFormEntry = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
        PlatFormEntry: options
	    }
	}
	instance = new PlatFormEntryConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);

}

export default platFormEntry
