<template>
<span class="meditha-theme-host">
</span>
</template>


<script>
export default {
  props: {
  	primary:  {
      type: String,
      default: null
    },
    
    primarytext:  {
      type: String,
      default: null
    },
    
    emphasis:  {
      type: String,
      default: null
    },
    active: {
    	type: Boolean,
     	 default: false
    },
},
  
   
  watch: {
    primary () {
	      this.refresh();
    },
    primarytext () {
	      this.refresh();
    },
    emphasis () {
	      this.refresh();
    },
    active () {
	      this.refresh();
    }
  },
  
  created: function () {
  		this.medithaThemeRequestListener = this.handleThemeRequest.bind(this) 
	    document.addEventListener('medithaThemeRequest', this.medithaThemeRequestListener);
  		
  },
  
   destroyed: function() {
  	document.removeEventListener('medithaThemeRequest', this.medithaThemeRequestListener);
  	this.medithaThemeRequestListener = null;
  },
  
  computed: {
 
  },
  
  mounted: function() {
 	 this.refresh()
  },
  
  data () {
    return {
    	medithaThemeRequestListener: null
    }
  },
  
  methods: {
  
  refresh: function() {
  
  	if (this.active && this.primary && this.emphasis) {
  	    console.log("MedithaThemeEvent launched")
  	    var event = new CustomEvent('medithaTheme', { detail: {primary: this.primary, emphasis: this.emphasis, primarytext: this.primarytext}});
  		document.dispatchEvent(event);
  	}
  },
  
  handleThemeRequest: function() {
  	this.refresh();
  }
  
  }
}
</script>

<style>
  
</style>