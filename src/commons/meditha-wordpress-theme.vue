<template>
<span class="meditha-theme-host">
</span>
</template>


<script>
export default {
  props: {
  },
  
   
  created: function () {
  		this.aerisThemeRequestListener = this.handleThemeRequest.bind(this) 
   document.addEventListener('medithaThemeRequest', this.medithaThemeRequestListener);
  },
  
   destroyed: function() {
  	document.removeEventListener('medithaThemeRequest', this.medithaThemeRequestListener);
  	this.medithaThemeRequestListener = null;
  },
  
  computed: {
 
  },
  
  mounted: function() {
	  this.refresh();
  },
  
  data () {
    return {
    	primary: null,
    	emphasis: null,
    	medithaThemeRequestListener: null
    }
  },
  
  methods: {
  
  refresh: function() {
	  var aux =  document.querySelector("body");
	  this.primary = aux.getAttribute("data-color")
	  this.emphasis = aux.getAttribute("data-secondary-color")
	  console.log("Wordpress theme event")
	  var event = new CustomEvent('medithaTheme', { detail: {primary: this.primary, emphasis: this.emphasis}});
	  console.log(event)
  		document.dispatchEvent(event);
  },
  
  handleThemeRequest: function() {
  	this.refresh();
  }
  
  }
}
</script>

<style>
 
</style>