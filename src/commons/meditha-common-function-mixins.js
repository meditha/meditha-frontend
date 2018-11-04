export const VueMedithaCommonFunctionPlugin = {
		install(Vue, options) {
			console.log("Installation of VueMedithaCommonFunctionPlugin")
			 Vue.mixin({
				    
				    methods:{
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