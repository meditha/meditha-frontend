<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/referencemanuscript-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('referenceManuscriptForPublishing')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">

<table v-show="edit" width="100%" style="border-spacing: 0px;">
<tr>
<td align="left">
<span class="clickable" @click="openDatabaseModal" style="text-decoration: underline;">{{$t('chooseFromCoteDatabase')}}</span>
</td>
<td align="right">
<span class="clickable" @click="reset()" v-show="hasReferenceManuscript" style="text-decoration: underline;">{{$t('reset')}}</span>
</td>
</tr>
</table>
    
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">

<tr><td><h5 class="primary-color">{{$t('cote')}}:</h5></td><td>
  {{cote}}</input>
 </td></tr>
 
 <tr><td><h5 class="primary-color">{{$t('role')}}:</h5></td><td>
  {{role}}</input>
 </td></tr> 

 <tr><td><h5 class="primary-color">{{$t('link')}}:</h5></td><td>
  {{link}} <i class="fa fa-link clickable" v-show="link" @click="openUrl(link)" :title="$t('clickToOpen')"></i></input>
 </td></tr>

 <tr><td><h5 class="primary-color">{{$t('bibliography')}}:</h5></td><td>
  {{bibliography}}</input>
 </td></tr>

</table>
</main>

<meditha-pager collection="referencemanuscript" :modaltitle="$t('referenceManuscriptsForPublishing')" :tablelabels="$t('cote')" tablecolumns="cote"/>

</div>

</template>

<style>
@import './../commons/meditha-style.css';




</style>

<script>
export default {
  props: {
  
  	edit: {
      type: Boolean,
      default: false
    },
  

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
      medithaPagerSelectListener:true,
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
     document.removeEventListener('medithaPagerSelectEvent', this.medithaPagerSelectListener);
    this.medithaPagerSelectListener = null;
  },

  created: function() {
    this.medithaThemeListener = this.handleTheme.bind(this);
    document.addEventListener('medithaTheme', this.medithaThemeListener);
     this.medithaPagerSelectListener = this.handlePagerSelect.bind(this);
    document.addEventListener('medithaPagerSelectEvent', this.medithaPagerSelectListener);
  },

  updated: function() {
    this.ensureTheme();
  },
  
  computed: {
  
    
     hasReferenceManuscript: function() {
     if ((this.metadata) && (this.metadata.source)) {
     	return this.metadata.source.referencemanuscript != null
     }
     return false;
     },
     
     creationDate: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.creationDate
     }
     else {
     	return "";
     }
     },
     
     role: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	var role = this.metadata.source.referencemanuscript.role
     	if (role == 'other') {
     		if (this.metadata.source.referencemanuscript.otherRole) {
     			return this.metadata.source.referencemanuscript.otherRole
     		}
     	}
     	return role
     }
     else {
     	return "";
     }
     },
     
     cote: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.cote
     }
     else {
     	return "";
     }
     },
     
     bibliography: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.bibliography
     }
     else {
     	return "";
     }
     },
     
     link: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.link
     }
     else {
     	return "";
     }
     }
     
     		
     
     
  
    
    
  },

  methods: {
  
  reset: function() {
  	this.metadata.source.referencemanuscript = null
  },
  
  handlePagerSelect: function(e) {
  	if (e.detail.collection =="referencemanuscript") {
  		this.metadata.source.referencemanuscript = e.detail.item
  	}
  },
  
  openDatabaseModal: function() {
  
   var event = new CustomEvent('medithaPagerShowEvent', { detail: {collection: 'referencemanuscript'}});
   
    document.dispatchEvent(event);
  },
  
    handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	}
    
    },
  
    
  }
}
</script>
