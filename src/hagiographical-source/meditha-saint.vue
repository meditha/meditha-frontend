<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/saint-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('saint')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">

<table v-show="edit" width="100%" style="border-spacing: 0px;">
<tr>
<td align="left">
<span class="clickable" @click="openDatabaseModal" style="text-decoration: underline;">{{$t('addFromCoteDatabase')}}</span>
</td>
</tr>
</table>
    
</main>

<meditha-pager collection="saint" :modaltitle="$t('saints')" :tablelabels="$t('name')" tablecolumns="name"/>

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
  
    
  },

  methods: {
  
  
  handlePagerSelect: function(e) {
  	if (e.detail.collection =="saint") {
  		this.metadata.source.referencemanuscript = e.detail.item
  	}
  },
  
  openDatabaseModal: function() {
  
   var event = new CustomEvent('medithaPagerShowEvent', { detail: {collection: 'saint'}});
   
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
