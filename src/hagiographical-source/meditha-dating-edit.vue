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
<tr><td><h5 class="primary-color">{{$t('datingCriteria')}}:</h5></td><td>
  <input type="checkbox" id="dr1" value="manuscripts" v-model="ldatingCriteria"/>  <label for="dr1">{{$t('manuscripts')}}</label>
  <input type="checkbox" id="dr2" value="author" v-model="ldatingCriteria"/>  <label for="dr2">{{$t('author')}}</label>
  <input type="checkbox" id="dr3" value="language" v-model="ldatingCriteria"/>  <label for="dr3">{{$t('language')}}</label>
  <input type="checkbox" id="dr4" value="other" v-model="ldatingCriteria"/>  <label for="dr4">{{$t('other')}}</label>
 </td></tr>
 
 <tr v-show="hasOther">
  <td><h5 class="primary-color">{{$t('specify')}}:</h5></td><td>
  <input class="meditha-input" v-model="otherDatingCriteria" ></input>
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
  
    hasOther: function() {
    	return this.ldatingCriteria.includes("other")
    },
    
    otherDatingCriteria: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.dates) {
				return this.metadata.source.dates.otherDatingCriteria;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.dates) {
				this.metadata.source.dates = {}
			}
			this.metadata.source.dates.otherDatingCriteria=value;
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
