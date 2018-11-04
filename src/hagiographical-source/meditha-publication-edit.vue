<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/publication-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('publication')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color">{{$t('scientificEditorName')}}:</h5></td><td>
  <input class="meditha-input" v-model="scientificEditorName" ></input>
 </td></tr>
 
 <tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('referencePublication')}}</span></td></tr>
 
 <tr><td class="sublabel" ><h5 class="primary-color">{{$t('referencePublication')}}:</h5></td>
 <td> 
 <select class="meditha-select" v-model="referencePublication" >
<option value="MGH">MGH</option>
<option value="AASS">AASS</option>
<option value="AASS OSB">AASS OSB</option>
<option value="SChr">SChr</option>
<option value="CC">CC</option>
<option value="others">{{$t('others')}}</option>
</select> </td></tr>

 <tr v-show="referencePublication == 'MGH'"><td class="sublabel" ><h5 class="primary-color">{{$t('complement')}}:</h5></td>
 <td> 
 <select class="meditha-select" v-model="referencePublicationCompl" >
<option value="SRM">SRM</option>
<option value="SS">SS</option>
</select> </td></tr>

 <tr v-show="referencePublication == 'CC'"><td class="sublabel" ><h5 class="primary-color">{{$t('complement')}}:</h5></td>
 <td> 
 <select class="meditha-select" v-model="referencePublicationCompl" >
<option value="SL">SL</option>
<option value="CM">CM</option>
</select> </td></tr> 
 

 <tr  v-show="referencePublication == 'others'"><td class="sublabel" ><h5 class="primary-color">{{$t('specify')}}:</h5></td><td>
  <input class="meditha-input" v-model="otherReferencePublication" ></input>
</td></tr> 
 
 
<tr><td><h5 class="primary-color">{{$t('reference')}}:</h5></td><td>
  <input class="meditha-input" v-model="reference" ></input>
</td></tr> 

 <tr><td><h5 class="primary-color">{{$t('yearOfPublication')}}:</h5></td><td>
  <input class="meditha-input" v-model="yearOfPublication" ></input>
 </td></tr> 
 
  <tr><td><h5 class="primary-color">{{$t('pagination')}}:</h5></td><td>
  <input class="meditha-input" v-model="pagination" ></input>
 </td></tr> 
 
 <tr><td><h5 class="primary-color">{{$t('otherPublications')}}:</h5></td><td>
  <input class="meditha-input" v-model="otherPublications" ></input>
 </td></tr> 

</table>
</main>
</div>

</template>

<style>
@import './../commons/meditha-style.css';




</style>

<script>
export default {
  props: {

  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

 
  data() {
    return {
      visible: true,
      lang: 'en',
      metadataListener:true,
      metadata: null
    }
  },
  
  
   mounted: function() {
    var event = new CustomEvent('medithaThemeRequest', {});
    document.dispatchEvent(event);
  },

  destroyed: function() {
    document.removeEventListener('medithaTheme', this.medithaThemeListener);
    this.medithaThemeListener = null;
  },

  created: function() {
    this.medithaThemeListener = this.handleTheme.bind(this);
    document.addEventListener('medithaTheme', this.medithaThemeListener);
  },

  updated: function() {
    this.ensureTheme();
  },
  
  computed: {
  
    scientificEditorName: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.scientificEditorName;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.scientificEditorName=value;
		}     
		
    },
    
     reference: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.reference;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.reference=value;
		}     
		
    },
    
     yearOfPublication: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.yearOfPublication;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.yearOfPublication=value;
		}     
		
    },
    
     pagination: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.pagination;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.pagination=value;
		}     
		
    },
    
    
    referencePublication: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.referencePublication;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.referencePublication=value;
			if (value!='others') {
				this.metadata.source.publication.otherreferencePublication =''
			}
			if ((value!='CC') && (value!='MGH')) {
				this.metadata.source.publication.referencePublicationCompl =''
			}
			
		}     
		
    },
    
     referencePublicationCompl: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.referencePublicationCompl;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.referencePublicationCompl=value;
		}     
		
    },
    
    
    
    otherReferencePublication : { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.otherReferencePublication;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.otherReferencePublication=value;
		}     
		
    },
    
     otherPublications : { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication) {
				
				return this.metadata.source.publication.otherPublications;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.publication) {
				this.metadata.source.publication = {}
			}
			this.metadata.source.publication.otherPublications=value;
		}     
		
    }
    
    
  },

  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	  this.$el.querySelectorAll(".sublabel").forEach(el => el.style.borderLeftColor = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel-title").forEach(el => el.style.background = this.theme.primary);
    	}
    
    }
  }
}
</script>
