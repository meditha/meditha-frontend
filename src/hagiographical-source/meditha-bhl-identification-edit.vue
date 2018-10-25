<i18n src="./locales/bhl-identification-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-book primary-color"></i>{{$t('formTitle')}}</h3>
  </header>
<main class="meditha-text-information-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
<tr><td><h5 class="primary-color">{{$t('bhlIdentifier')}}:</h5></td><td> {{bhlIdentifier}}</td></tr>
<tr><td><h5 class="primary-color">{{$t('clavisReference')}}:</h5></td><td> <select class="meditha-select" v-model="clavisReference"><option>Gallia</option><option>Italia</option></select> </td></tr>
<tr><td><h5 class="primary-color">{{$t('clavisReferenceCote')}}:</h5></td><td><input class="meditha-input" v-model="clavisReferenceCote" ></input></td></tr>
<tr><td><h5 class="primary-color">{{$t('latinTitle')}}:</h5></td><td><input class="meditha-input" v-model="latinTitle" ></input></td></tr>

<tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('bhlNature')}}</span></td></tr>

<tr><td class="sublabel" style="vertical-align: top;"><h5 class="primary-color">{{$t('bhlNature')}}:</h5></td><td><select class="meditha-select" v-model="bhlNature"><option value="Vita">Vita</option><option value="Miracula">Miracula</option><option value="Translatio">Translatio</option><option value="Vita et Miracula">Vita et Miracula</option><option value="Gesta">Gesta</option><option value="Acta">Acta</option><option value="other">{{$t('other')}}</option></select></td></tr>
<tr v-show="bhlNature=='other'"><td class="sublabel" style="vertical-align: top;"><h5 class="primary-color">{{$t('specify')}}:</h5></td><td><input  style="margin-top: 4px;" class="meditha-input" v-model="otherBhlNature"  ></input></td></tr>
<tr><td class="sublabel" style="vertical-align: top;"><h5 class="primary-color">{{$t('observation')}}:</h5></td><td><textarea class="meditha-input" v-model="bhlNatureObservation" rows="5"></textarea></td></tr>
<tr><td><h5 class="primary-color">{{$t('completeness')}}:</h5></td><td> <select class="meditha-select" v-model="completeness"><option value="completeText">{{$t('completeText')}}</option><option value="incompleteText">{{$t('incompleteText')}}</option><option value="unfinishedText">{{$t('unfinishedText')}}</option></select> </td></tr>


<tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('paratext')}}</span></td></tr>
<tr><td class="sublabel"><h5 class="primary-color">{{$t('presence')}}:</h5></td><td> <select class="meditha-select" v-model="paratext"><option value="yes">{{$t('yes')}}</option><option value="no">{{$t('no')}}</option><option value="lost">{{$t('lost')}}</option></option><option value="likely">{{$t('likely')}}</option></select> </td></tr>
<tr  v-show="paratext=='yes'"><td class="sublabel"><h5 class="primary-color">{{$t('type')}}:</h5></td><td> <select class="meditha-select" v-model="paratextType"><option value="dedication">{{$t('dedication')}}</option><option value="prologue">{{$t('prologue')}}</option><option value="conclusion">{{$t('conclusion')}}</option></option><option value="other">{{$t('other')}}</option></select> </td></tr>
<tr v-show="paratextType=='other'"><td class="sublabel" style="vertical-align: top;"><h5 class="primary-color">{{$t('specify')}}:</h5></td><td><input  style="margin-top: 4px;" class="meditha-input" v-model="otherParatextType" ></input></td></tr>
<tr><td ><h5 class="primary-color">{{$t('audience')}}:</h5></td><td> <select class="meditha-select" v-model="audience"><option value="undifferentiatedChristians">{{$t('undifferentiatedChristians')}}</option><option value="monasticCommunity">{{$t('monasticCommunity')}}</option><option value="localCommunity">{{$t('localCommunity')}}</option></option><option value="disciple">{{$t('disciple')}}</option><option value="other">{{$t('other')}}</option></select> </td></tr>
<tr v-show="audience=='other'"><td style="vertical-align: top;"><h5 class="primary-color">{{$t('specify')}}:</h5></td><td><input  style="margin-top: 4px;" class="meditha-input" v-model="otherAudience" ></input></td></tr>
</table>
</main>
</div>

</template>

<style>
@import './../commons/meditha-style.css';

.sublabel.noleftborder {
	padding-left: 0px;
}

.sublabel h5{
	padding-left: 10px;
}

.sublabel {
	border-left : 1px solid #ccc;
}


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
    
     latinTitle: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.latinTitle;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.latinTitle=value;
		}     
		
    },
    
     bhlNature: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.bhlNature;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.bhlNature=value;
			if (this.metadata.source.bhlNature !='other') {
					this.metadata.source.otherBhlNature=null;
				}
		}     
		
    },
    
     completeness: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.completeness;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.completeness=value;
		}     
		
    },
    
    paratext: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.paratext;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.paratext=value;
			if (value != 'yes') {
				this.metadata.source.paratextType=null;
				this.metadata.source.otherParatextType=null;
			}
		}     
		
    },
    
    paratextType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.paratextType;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.paratextType=value;
			if (value != 'other') {
				this.metadata.source.otherParatextType=null;
			}
		}     
		
    },
    
    otherParatextType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.otherParatextType;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
				if (this.metadata.source.paratextType =='other') {
					this.metadata.source.otherParatextType=value;
				}
				else {
					this.metadata.source.otherParatextType=null
				}
		}     
		
    },
    
    otherBhlNature: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.otherBhlNature;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
				if (this.metadata.source.bhlNature =='other') {
					this.metadata.source.otherBhlNature=value;
				}
				else {
					this.metadata.source.otherBhlNature=null
				}
		}     
		
    },
    
     audience: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.audience;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.audience=value;
			if (this.metadata.source.audience !='other') {
					this.metadata.source.otherAudience=null;
				}
		}     
		
    },
    
     otherAudience: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.otherAudience;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
				if (this.metadata.source.audience =='other') {
					this.metadata.source.otherAudience=value;
				}
				else {
					this.metadata.source.otherAudience=null
				}
		}     
		
    },
    
     bhlNatureObservation: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.bhlNatureObservation;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
				this.metadata.source.bhlNatureObservation=value;
		}     
		
    },
    
    clavisReferenceCote: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.clavisReferenceCote;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.clavisReferenceCote=value;
		}     
		
    },
    
     clavisReference: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source) {
				return this.metadata.source.clavisReference;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			this.metadata.source.clavisReference=value;
		}     
		
    }
    
    
    
    
  },

  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    console.log("ensuretheme")
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel").forEach(el => el.style.borderLeftColor = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel-title").forEach(el => el.style.background = this.theme.primary);
    	}
    
    }
  }
}
</script>
