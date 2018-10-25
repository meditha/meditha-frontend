<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/sponsor-locales.json"></i18n>
<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('sponsor')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color">{{$t('type')}}:</h5></td><td> {{ $t(sponsorType) }} </td></tr>
<tr><td><h5 class="primary-color">{{$t('name')}}:</h5></td><td> {{ sponsorName }} </td></tr>
<tr><td><h5 class="primary-color">{{$t('placeOfLife')}}:</h5></td><td> {{ $t(sponsorPlaceOfLife) }} </td></tr>
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
  
    sponsorType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				var aux=  this.metadata.source.sponsor.type;
				
				if (aux == 'other') {
   					if (this.metadata.source.sponsor.otherSponsorType) {
   						return this.metadata.source.sponsor.otherSponsorType;
   					}
   					else {
   					return aux;
   					}
    			}
    			else {
    				return aux;
    			}
				
			}
			else {
				return null;
			}
		},
		
    },
    
  
    sponsorName: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.sponsor.name;
			}
			else {
				return null;
			}
		},
		
		
    },
    
    
    sponsorPlaceOfLife: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.sponsor.placeOfLife;
			}
			else {
				return null;
			}
		},
		
		
    },
    
    
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
