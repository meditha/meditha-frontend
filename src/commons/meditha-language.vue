<template>
<span class="meditha-language-host">
</span>
</template>


<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: null
    },
    active: {
    	type: Boolean,
     	 default: false
    },
},
  
   
  watch: {
    lang () {
	      this.refresh();
    },
    active () {
	      this.refresh();
    }
  },
  
  created: function () {
  		this.refresh()
  		this.medithaLanguageRequestListener = this.handleLanguageRequest.bind(this) 
   document.addEventListener('medithaLanguageRequest', this.medithaLanguageRequestListener);
  },
  
   destroyed: function() {
  	document.removeEventListener('medithaLanguageRequest', this.medithaLanguageRequestListener);
  	this.medithaLanguageRequestListener = null;
  },
  
  computed: {
 
  },
  
  mounted: function() {
   
  },
  
  data () {
    return {
    	medithaLanguageRequestListener: null
    }
  },
  
  methods: {
  
  refresh: function() {
  	if (this.active && this.lang) {
  	    var event = new CustomEvent('medithaLanguageResponse', { detail: {lang: this.lang}});
  		document.dispatchEvent(event);
  	}
  },
  
  handleLanguageRequest: function() {
  	this.refresh();
  }
  
  }
}
</script>

<style>
  
</style>