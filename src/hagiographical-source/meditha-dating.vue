<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/dating-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-clock-o primary-color"></i>{{$t('dates')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color">{{$t('datingCriteria')}}:</h5></td><td>{{datingCriteria}} </td></tr>
 

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
    },
    
    ldatingCriteria(value) {
    	this.metadata.source.dates.datingCriteria=this.ldatingCriteria
    },
  },

 
  data() {
    return {
      visible: true,
      lang: 'en',
      metadataListener:true,
      metadata: null,
      ldatingCriteria: []
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
  
    datingCriteria: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.dates) {
				if (this.metadata.source.dates.datingCriteria) {
				
					var result = [];
					for (var i = 0; i < this.metadata.source.dates.datingCriteria.length; i++) {
					
					if (this.metadata.source.dates.datingCriteria[i] =='other') {
						if (this.metadata.source.dates.otherDatingCriteria) {
						result.push(this.metadata.source.dates.otherDatingCriteria)
						} else {
						result.push(this.$i18n.t(this.metadata.source.dates.datingCriteria[i]))
						}
						
					} else {
						result.push(this.$i18n.t(this.metadata.source.dates.datingCriteria[i]))
					
					}
					}
				
					return result.join(", ")
				}
			}
			else {
				return "";
			}
		}  
		
    }
    
   
    
    
  },

  methods: {
  
  postMetadataLoad: function() {
  		this.ldatingCriteria = this.metadata.source.dates.datingCriteria;
  },
  
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
