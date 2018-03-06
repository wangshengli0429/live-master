import Vue from 'vue';
import Main from './main.vue'


let ModifyActorConstructor = Vue.extend(Main)

let instance;

const ModifyActor = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	ModifyActor: options
	    }
	}
	instance = new ModifyActorConstructor({
    	data: options
  	});
  	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}

export default ModifyActor