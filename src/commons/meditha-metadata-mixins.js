export const VueMedithaMetadataPlugin = {
		install(Vue, options) {
			console.log("Installation of VueMedithaMetadataPlugin")
			 Vue.mixin({
				    mounted: function () {
				      if (this.metadataListener) {
				    	  var metadataHandler = function(e) {this.metadata=e.detail.metadata}.bind(this);
				    	  document.addEventListener('medithaMetadataResponse', metadataHandler);
				    	  this.metadataHandler = this.metadataHandler 
				    	  var event = new CustomEvent('medithaMetadataRequest', {});
				    	  document.dispatchEvent(event);
				      }
				    },
				    
				    destroyed: function() {
				    	if (this.metadataHandler) {
					    	  document.removeEventListener('medithaMetadataResponse', this.metadataHandler);
					    	  this.metadataHandler = null
					      }
				    }
				    
				  })
		  
		  }
};