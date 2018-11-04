<i18n>
{
  "en": {
    "loading": "Loading ..."
   },
  "fr": {
  	"loading": "Chargement ..."
  }
}
</i18n>
<template>
<span class="meditha-metadata-loader-host">
</span>
</template>


<script>
export default {
  props: {
  
},
  
   
  watch: {
  },
  
  created: function () {
  		
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
    
 	this.loadMetadata()
   
  },
  
  data () {
    return {
    	medithaMetadataRequestListener: null,
    	rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/metadata',
    	metadata:null
    }
  },
  
  methods: {
  
  
  getQueryVariable: function (variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
},
  
  
  loadMetadata: function() {
        var uuid = this.getQueryVariable("uuid");
		if (uuid == false) {
			return;
		}  		
		
		var url = this.rootUrl+'/'+uuid;
    	var loadingMessage = this.$i18n.t('loading')
    document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: loadingMessage}}))
    this.$http.get(url).then(response => {
    this.loading = false;
    console.log("okok")
    document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: loadingMessage}}))
    var aux = response.body.detail;
    
    this.metadata = this.forceConditionningValues(aux);
    this.handleMetadataRequest()
   

  }, response => {
  this.loading = false;
  document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: loadingMessage}}))
  	console.log("KO");
  	console.log(response);
  	this.metadata = null;
  	this.handleMetadataRequest()
  	
  });
  		
  },
  
  forceConditionningValues: function(metadata) {
  	if (!metadata.source) {
  		metadata.source={}
  	}
  	if (!metadata.source.bhlNature) {
  		metadata.source.bhlNature=''
  	}
  	if (!metadata.source.bhlNature) {
  		metadata.source.bhlNature=''
  	}
  	
  	if (!metadata.source.paratext) {
  		metadata.source.paratext=''
  	}
  	
  	if (!metadata.source.paratextType) {
  		metadata.source.paratextType=''
  	}
  	
  	if (!metadata.source.audience) {
  		metadata.source.audience=''
  	}
  	
  	if (!metadata.source.sponsor) {
  		metadata.source.sponsor={}
  	}
  	
  	if (!metadata.source.sponsor.type) {
  		metadata.source.sponsor.type=''
  	}
  	
  	if (!metadata.source.author) {
  		metadata.source.author={}
  	}
  	
  	if (!metadata.source.author.type) {
  		metadata.source.author.type=''
  	}

	if (!metadata.source.author.name) {
  		metadata.source.author.name=''
  	}
  	
  	if (!metadata.source.author.gender) {
  		metadata.source.author.gender=''
  	}
  	
  	if (!metadata.source.author.url) {
  		metadata.source.author.url=''
  	}
  	
  	if (!metadata.source.author.status) {
  		metadata.source.author.status=[]
  	}
  	
  	if (!metadata.source.author.sponsorConnexions) {
  		metadata.source.author.sponsorConnexions=[]
  	}
  	
  	if (!metadata.source.author.recipientConnexions) {
  		metadata.source.author.recipientConnexions=[]
  	}
  	
  	
  	if (!metadata.source.dates) {
  		metadata.source.dates={}
  	}
  	
  	if (!metadata.source.dates.datingCriteria) {
  		metadata.source.dates.datingCriteria=[]
  	}
  	
  	if (!metadata.source.publication) {
  		metadata.source.publication={}
  	}
  	
  	if (!metadata.source.publication.referencePublication) {
  		metadata.source.publication.referencePublication=''
  	}
  	
  	if (!metadata.source.publication.referencePublicationCompl) {
  		metadata.source.publication.referencePublicationCompl=''
  	}
  	
  	if (!metadata.source.referencemanuscript) {
  		metadata.source.referencemanuscript=null
  	}
  	
  	
  	return metadata
  },
  
  handleMetadataRequest: function() {
  	if (this.metadata) {
  	 var event = new CustomEvent('medithaMetadataResponse', { detail: {metadata: this.metadata}});
  	document.dispatchEvent(event);
  	}
  }
  
  }
}
</script>

<style>
  
</style>