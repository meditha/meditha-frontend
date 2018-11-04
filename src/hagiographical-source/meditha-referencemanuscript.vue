<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/referencemanuscript-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('publication')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color">{{$t('scientificEditorName')}}:</h5></td><td>{{scientificEditorName}}</input></td>
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
			if (this.metadata && this.metadata.source && this.metadata.source.manuscript && this.metadata.source.manuscript.scientificEditorName) {
				
				return "Ed. "+this.metadata.source.manuscript.scientificEditorName;
			}
			else {
				return null;
			}
		} 
		
    },
    
    reference: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.manuscript && this.metadata.source.manuscript.reference) {
				
				return this.metadata.source.manuscript.reference;
			}
			else {
				return null;
			}
		} 
		
    },
    
    yearOfPublication: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.manuscript && this.metadata.source.manuscript.yearOfPublication) {
				
				return this.metadata.source.manuscript.yearOfPublication;
			}
			else {
				return null;
			}
		} 
		
    },
    
    pagination: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.manuscript && this.metadata.source.manuscript.pagination) {
				
				return this.metadata.source.manuscript.pagination;
			}
			else {
				return null;
			}
		} 
		
    },
    
     otherPublications: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.manuscript && this.metadata.source.manuscript.otherPublications) {
				
				return this.metadata.source.manuscript.otherPublications;
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
