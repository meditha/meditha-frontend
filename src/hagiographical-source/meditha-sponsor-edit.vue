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
<tr><td><h5 class="primary-color">{{$t('type')}}:</h5></td><td> <select class="meditha-select" v-model="sponsorType">
<option value="secular">{{$t('secular')}}</option>
<option value="bishop">{{$t('bishop')}}</option>
<option value="abbot">{{$t('abbot')}}</option>
<option value="abbess">{{$t('abbess')}}</option>
<option value="canon">{{$t('canon')}}</option>
<option value="community">{{$t('community')}}</option>
<option value="other">{{$t('other')}}</option>
</select> </td></tr>
<tr v-show="sponsorType=='other'"><td  style="vertical-align: top;"><h5 class="primary-color">{{$t('specify')}}:</h5></td><td><input  style="margin-top: 4px;" class="meditha-input" v-model="otherSponsorType"  ></input></td></tr>
<tr><td><h5 class="primary-color">{{$t('name')}}:</h5></td><td><input class="meditha-input" v-model="sponsorName" ></input></td></tr>
<tr><td><h5 class="primary-color">{{$t('placeOfLife')}}:</h5></td><td> <select class="meditha-select" v-model="sponsorPlaceOfLife">
<option value="episcopate">{{$t('episcopate')}}</option>
<option value="abbey">{{$t('abbey')}}</option>
<option value="reign">{{$t('reign')}}</option>
</select> </td></tr>
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
				return this.metadata.source.sponsor.type;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
			this.metadata.source.sponsor.type=value;
			if (this.metadata.source.sponsor.type !='other') {
					this.metadata.source.sponsor.otherSponsorType=null;
				}
		}     
		
    },
    
    otherSponsorType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.otherSponsorType;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
		if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
				if (this.metadata.source.sponsor.type =='other') {
					this.metadata.source.sponsor.otherSponsorType=value;
				}
				else {
					this.metadata.source.sponsor.otherSponsorType=null
				}
		}     
		
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
		
		set: function(value) {
			if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
			this.metadata.source.sponsor.name=value;
		}     
		
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
		
		set: function(value) {
			if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
			this.metadata.source.sponsor.placeOfLife=value;
		}     
		
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
