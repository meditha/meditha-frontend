<template>
<span class="meditha-fake-metadata-host">
</span>
</template>


<script>
export default {
  props: {
  
},
  
   
  watch: {
  },
  
  created: function () {
  		this.refresh()
  		this.medithaMetadataRequestListener = this.handleMetadataRequest.bind(this) 
   		document.addEventListener('medithaMetadataRequest', this.medithaMetadataRequestListener);
  },
  
   destroyed: function() {
  	document.removeEventListener('medithaMetadataRequest', this.medithaMetadataRequestListener);
  	this.medithaMetadataRequestListener = null;
  },
  
  computed: {
 
  },
  
  mounted: function() {
   
  },
  
  data () {
    return {
    	medithaMetadataRequestListener: null
    }
  },
  
  methods: {
  
  refresh: function() {
  		var metadata = {"source": {
  		"bhlIdentifier": "BHL 12345", 
        "clavisReference": "Italia",
        "clavisReferenceCote": "Exemple de clavisReferenceCote",
 		"latinTitle": "Wingardium Leviosa",
 		"bhlNature": "other",
 		"otherBhlNature": "Another nature",
 		"bhlNatureObservation": "nature observation",
 		"completeness": "incompleteText",
 		"paratext": "yes",
 		"paratextType": "other",
 		"otherParatextType": "other type",
 		"otherAudience": "other audience",
 		"audience": "other",
 		"sponsor" : 
 		  {
 		   "type": "abbess",
 		   "name": "Rode",
 		   "lifeLocationType": "episcopate"
 		  }
     	 }
     	 
     	 };
  	    var event = new CustomEvent('medithaMetadataResponse', { detail: {metadata: metadata}});
  		console.log("TOTOTO")
  		document.dispatchEvent(event);
  		
  },
  
  handleMetadataRequest: function() {
  	this.refresh();
  }
  
  }
}
</script>

<style>
  
</style>