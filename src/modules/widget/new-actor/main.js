import Vue from 'vue';
import Main from './main.vue'


let NewActorConstructor = Vue.extend(Main)

let instance;

const NewActor = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	NewActor: options
	    }
	}
	instance = new NewActorConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default NewActor