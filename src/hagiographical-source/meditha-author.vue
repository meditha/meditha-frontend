<i18n>
{
  "en": {
    "author": "Author" 
  },
  "fr": {
  	"author": "Auteur"
  }
}
</i18n>

<template>

<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('author')}}</h3>
  </header>
  <main class="meditha-author-host">
 {{clavisReference}}
 <input type='button' @click="toto='GGG'">Click</input>
</main>
</div>



</template>

<style>

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
     console.log("ICI")
      this.$i18n.locale = value;
    },
    metadata(value) {
    	this.toto="NON NµULL";
    }
  },

 
  data() {
    return {
      lang: 'en',
      metadataListener:true,
      metadata: null,
      toto: "NUULLL"
    }
  },
  
  computed: {
    clavisReference: function () {
		if (this.metadata && this.metadata.source) {
			return this.metadata.source.clavisReference;
		}
		else {
			return null;
		}     
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
