<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/inventory-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('generalInventory')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">
<tr><td><h5 class="primary-color">{{$t('numberKnownManuscripts')}}:</h5></td><td>
  <input class="meditha-input" v-model="numberKnownManuscripts" ></input>
 </td></tr>

<tr><td><h5 class="primary-color">{{$t('presentOnBHLms')}}:</h5></td><td>
  <input class="meditha-input" v-model="presentOnBHLms" ></input>
 </td></tr>

<tr><td style="vertical-align: top;"><h5 class="primary-color">{{$t('notesOnHandwrittenTradition')}} <i class="fa fa-info-circle fa-lg" :title="$t('notesOnHandwrittenTraditionHelp')"></i> :</h5></td><td>
  <textarea class="meditha-input" v-model="notesOnHandwrittenTradition" rows="5"></textarea>
 </td></tr>
 
 <tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('typeDistribution')}}</span></td></tr>
 <tr><td class="sublabel"><h5 class="primary-color">{{$t('legendier')}}:</h5></td><td>  <input class="meditha-input" v-model="legendier" style="width:50%" ></input> <span v-show="legendierPct"> ({{legendierPct}}%)</span></td></tr>
 <tr><td class="sublabel"><h5 class="primary-color">{{$t('legendierPerCirculumAnni')}}:</h5></td><td>  <input class="meditha-input" v-model="legendierPerCirculumAnni" style="width:50%" ></input><span v-show="legendierPerCirculumAnniPct"> ({{legendierPerCirculumAnniPct}}%)</span> </td></tr>
<tr><td class="sublabel"><h5 class="primary-color">{{$t('passionnaire')}}:</h5></td><td>  <input class="meditha-input" v-model="passionnaire" style="width:50%" ></input><span v-show="passionnairePct"> ({{passionnairePct}}%)</span> </td></tr>
<tr><td class="sublabel"><h5 class="primary-color">{{$t('libellus')}}:</h5></td><td>  <input class="meditha-input" v-model="libellus" style="width:50%" ></input> <span v-show="libellusPct"> ({{libellusPct}}%)</span></td></tr>
<tr><td class="sublabel"><h5 class="primary-color">{{$t('anthology')}}:</h5></td><td>  <input class="meditha-input" v-model="anthology" style="width:50%" ></input> <span v-show="anthologyPct"> ({{anthologyPct}}%)</span></td></tr>
<tr><td class="sublabel"><h5 class="primary-color">{{$t('others')}}:</h5></td><td>  <input class="meditha-input" v-model="others" style="width:50%" ></input><span v-show="othersPct"> ({{othersPct}}%)</span> </td></tr>

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
  
  	legendierPct: function() {
  		if (this.legendier && this.numberKnownManuscripts) {
  			return this.computePct(this.legendier, this.numberKnownManuscripts)
  		}
  	},
  	
  	legendierPerCirculumAnniPct:function() {
  		if (this.legendierPerCirculumAnni && this.numberKnownManuscripts) {
  			return this.computePct(this.legendierPerCirculumAnni, this.numberKnownManuscripts)
  		}
  	},
  	
  	passionnairePct:function() {
  		if (this.passionnaire && this.numberKnownManuscripts) {
  			return this.computePct(this.passionnaire, this.numberKnownManuscripts)
  		}
  	},
  	
  	libellusPct:function() {
  		if (this.libellus && this.numberKnownManuscripts) {
  			return this.computePct(this.libellus, this.numberKnownManuscripts)
  		}
  	},
  	
  	anthologyPct:function() {
  		if (this.anthology && this.numberKnownManuscripts) {
  			return this.computePct(this.anthology, this.numberKnownManuscripts)
  		}
  	},
  	
  	othersPct:function() {
  		if (this.others && this.numberKnownManuscripts) {
  			return this.computePct(this.others, this.numberKnownManuscripts)
  		}
  	},
  
    numberKnownManuscripts: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts) {
				return this.metadata.manuscripts.numberKnownManuscripts;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.numberKnownManuscripts=value;
		}     
		
    },
    
    presentOnBHLms : { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts) {
				return this.metadata.manuscripts.presentOnBHLms;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.presentOnBHLms=value;
		}     
		
    },
    
    notesOnHandwrittenTradition: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts) {
				return this.metadata.manuscripts.notesOnHandwrittenTradition;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.notesOnHandwrittenTradition=value;
		}     
		
    },
    
     legendier: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.legendier
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.legendier=value;
		}     
		
    },
    
    legendierPerCirculumAnni: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.legendierPerCirculumAnni
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.legendierPerCirculumAnni=value;
		}     
		
    },
    
     passionnaire: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.passionnaire
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.passionnaire=value;
		}     
		
    },
    
     libellus: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.libellus
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.libellus=value;
		}     
		
    },
    
     anthology: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.anthology
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.anthology=value;
		}     
		
    },
    
     others: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.manuscripts && this.metadata.manuscripts.typeDistribution) {
				return this.metadata.manuscripts.typeDistribution.others
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.manuscripts.typeDistribution.others=value;
		}     
		
    }
    
    
    
    
  },

  methods: {
  
  computePct: function (partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
},
  
  postMetadataLoad: function() {
  },
  
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
