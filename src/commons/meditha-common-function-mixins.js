export const VueMedithaCommonFunctionPlugin = {
		install(Vue, options) {
			console.log("Installation of VueMedithaCommonFunctionPlugin")
			 Vue.mixin({
				    
				    methods:{
				    	
				    	 generateUuid: function() {
				    		  	function s4() {
				    		    	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				    		  	}
				    		  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
				    			},
				    	
				    	 openUrl(url) {
				    		    window.open(url, '_blank');	
				    	    },
				    	    
				    	 getRootUrl() {
				    	    	return 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev'
				    	    }   
				    	    
				      }
				    
				    
				    
				  })
		  
		  }
};