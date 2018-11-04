<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/publication-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('publication')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">
<tr><td><h5 class="primary-color">{{$t('scientificEditorName')}}:</h5></td><td>{{scientificEditorName}}</input></td>
<tr><td><h5 class="primary-color">{{$t('referencePublication')}}:</h5></td><td>{{referencePublication}}</input></td>
<tr><td><h5 class="primary-color">{{$t('reference')}}:</h5></td><td>{{reference}}</input></td>
<tr><td><h5 class="primary-color">{{$t('yearOfPublication')}}:</h5></td><td>{{yearOfPublication}}</input></td>
<tr><td><h5 class="primary-color">{{$t('pagination')}}:</h5></td><td>{{pagination}}</input></td>
<tr><td><h5 class="primary-color">{{$t('otherPublications')}}:</h5></td><td>{{otherPublications}}</input></td>
 </tr>
 
 

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
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.scientificEditorName) {
				
				return "Ed. "+this.metadata.source.publication.scientificEditorName;
			}
			else {
				return null;
			}
		} 
		
    },
    
     referencePublication: { 
    
 	   get: function () {
 	   	console.log("RRRR")
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.referencePublication) {
				
				if (this.metadata.source.publication.referencePublication =="MGH") {
					if (this.metadata.source.publication.referencePublicationCompl) {
						return "MGH ("+this.metadata.source.publication.referencePublicationCompl+")"
					}
					else {
						return "MGH"
					}
				}
				
				if (this.metadata.source.publication.referencePublication =="CC") {
					if (this.metadata.source.publication.referencePublicationCompl) {
						return "CC ("+this.metadata.source.publication.referencePublicationCompl+")"
					}
					else {
						return "CC"
					}
				}
				
				if (this.metadata.source.publication.referencePublication =="others") {
					if (this.metadata.source.publication.otherReferencePublication) {
						return this.metadata.source.publication.otherReferencePublication;
					}
					else {
						return this.$i18n.t("others");
					}
				}
				
				return this.metadata.source.publication.referencePublication
				
			}
			else {
				return null;
			}
		} 
		
    },
    
    reference: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.reference) {
				
				return this.metadata.source.publication.reference;
			}
			else {
				return null;
			}
		} 
		
    },
    
    yearOfPublication: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.yearOfPublication) {
				
				return this.metadata.source.publication.yearOfPublication;
			}
			else {
				return null;
			}
		} 
		
    },
    
    pagination: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.pagination) {
				
				return this.metadata.source.publication.pagination;
			}
			else {
				return null;
			}
		} 
		
    },
    
     otherPublications: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.publication && this.metadata.source.publication.otherPublications) {
				
				return this.metadata.source.publication.otherPublications;
			}
			else {
				return null;
			}
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
    	}
    
    }
  }
}
</script>
