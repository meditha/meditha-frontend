<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/bhl-identification-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-book primary-color"></i>{{$t('formTitle')}}</h3>
  </header>
<main class="meditha-text-information-host">
<table width="100%" style="border-spacing: 2px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color ">{{$t('bhlIdentifier')}}:</h5></td><td> {{bhlIdentifier}}</td></tr>
<tr><td><h5 class="primary-color">{{$t('clavisReference')}}:</h5></td><td> {{clavisReference}}  </td></tr>
<tr><td><h5 class="primary-color">{{$t('clavisReferenceCote')}}:</h5></td><td>{{clavisReferenceCote}}</td></tr>
<tr><td><h5 class="primary-color">{{$t('latinTitle')}}:</h5></td><td>{{latinTitle}}</td></tr>
<tr><td><h5 class="primary-color">{{$t('bhlNature')}}:</h5></td>{{$t(bhlNature)}}<td></td></tr>
<tr><td><h5 class="primary-color">{{$t('observation')}}:</h5></td>{{bhlNatureObservation}}<td></td></tr>
<tr><td><h5 class="primary-color">{{$t('completeness')}}:</h5></td>{{$t(completeness)}}<td></td></tr>
<tr><td><h5 class="primary-color">{{$t('paratext')}}:</h5></td>{{$t(paratext)}}<td></td></tr>
<tr v-show="paratext=='yes'"><td><h5 class="primary-color">{{$t('type')}}:</h5></td>{{$t(paratextType)}}<td></td></tr>
<tr><td><h5 class="primary-color">{{$t('audience')}}:</h5></td>{{$t(audience)}}<td></td></tr>
</table>
</main>
</div>

</template>

<style>
@import './../commons/meditha-style.css';

.meditha-text-information-host ul {
    list-style: none;
}

.meditha-text-information-host li {
	display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.meditha-text-information-host li h5 {
	margin-right: 10px;
	font-size: 1rem;
    font-weight: 400;
    margin: 0;
}  

.meditha-text-information-host li p {
    margin: 0;
    margin-left: 10px;
}



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
      //visible: false
      
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
  
    bhlIdentifier: function() {
    	if (this.metadata && this.metadata.source) {
			return this.metadata.source.bhlIdentifier;
		}
		else {
			return null;
		} 
    },
    
    bhlNatureObservation: function() {
    	if (this.metadata && this.metadata.source) {
			return this.metadata.source.bhlNatureObservation;
		}
		else {
			return null;
		} 
    },
    
     completeness: function() {
    	if (this.metadata && this.metadata.source) {
			return this.metadata.source.completeness;
		}
		else {
			return null;
		} 
    },
    
     paratext: function() {
    	if (this.metadata && this.metadata.source) {
			return this.metadata.source.paratext;
		}
		else {
			return null;
		} 
    },
    

     bhlNature: function() {
    	if (this.metadata && this.metadata.source) {
    		var aux = this.metadata.source.bhlNature;
    		if (aux == 'other') {
   				if (this.metadata.source.otherBhlNature) {
   					return this.metadata.source.otherBhlNature;
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
    
     audience: function() {
    	if (this.metadata && this.metadata.source) {
    		var aux = this.metadata.source.audience;
    		if (aux == 'other') {
   				if (this.metadata.source.otherAudience) {
   					return this.metadata.source.otherAudience;
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
    
    paratextType: function() {
    	if (this.metadata && this.metadata.source) {
    		var aux = this.metadata.source.paratextType;
    		if (aux == 'other') {
   				if (this.metadata.source.otherParatextType) {
   					return this.metadata.source.otherParatextType;
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



    
    clavisReference: function () {
		if (this.metadata && this.metadata.source) {
			return this.metadata.source.clavisReference;
		}
		else {
			return null;
		}     
    },
    
    latinTitle: function () {
		if (this.metadata && this.metadata.source) {
			return this.metadata.source.latinTitle;
		}
		else {
			return null;
		}     
    },
    
    clavisReferenceCote: function () {
		if (this.metadata && this.metadata.source) {
			return this.metadata.source.clavisReferenceCote;
		}
		else {
			return null;
		}     
    }
  },

  methods: {
  
   handleTheme: function(event) {
   console.log("MedithaThemeEvent received")
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
