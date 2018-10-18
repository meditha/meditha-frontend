export const VueMedithaLanguagePlugin = {
		install(Vue, options) {
			console.log("Installation of VueMedithaLanguagePlugin")
			 Vue.mixin({
				    mounted: function () {
				      if (this.lang) {
				    	  var languageHandler = function(e) {this.lang=e.detail.lang}.bind(this);
				    	  document.addEventListener('medithaLanguageResponse', languageHandler);
				    	  this.languageHandler = this.languageHandler 
				    	  var event = new CustomEvent('medithaLanguageRequest', {});
				    	  document.dispatchEvent(event);
				      }
				    },
				    
				    destroyed: function() {
				    	if (this.languageHandler) {
					    	  document.removeEventListener('medithaLanguageResponse', this.languageHandler);
					    	  this.languageHandler = null
					      }
				    }
				    
				  })
		  
		  }
};