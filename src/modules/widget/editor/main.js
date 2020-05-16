import Vue from 'vue';
import Main from './main.vue'

const EditorConstructor = Vue.extend(Main);

let instance;



const Editor = options => {
	options = options || {};
	if (typeof options === 'string') {
	    options = {
	      	editor: options
	    }
	}

	instance = new EditorConstructor({
    data: options
  });
 	document.getElementById('app').appendChild(instance.$mount().$el);
  	
}


export default Editor