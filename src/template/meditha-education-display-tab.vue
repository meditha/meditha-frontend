<template>
<span class="meditha-education-display-tab-host">
<meditha-bhl-identification></meditha-bhl-identification>
</span>
</template>

<script>
	export default {
	props: {
	},
  
   mounted: function() {
  },

  destroyed: function() {
  },

  created: function() {
  },

  updated: function() {
  },
  
  computed: {
    
  },

   data () {
    return {
    	theme: null,
    	medithaThemeListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
  
    handleTheme: function(event) {
      this.theme = event.detail;
    }
    
  
  }
}
</script>

<style>
 </style>