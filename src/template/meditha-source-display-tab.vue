<template>
<span class="meditha-source-display-host">

<div class="row2">
		<div class="column2" style="margin-right:5px">
			<meditha-saint class="block"></meditha-saint>
			<br />
			<meditha-publication  class="block"></meditha-publication>
			<br />
			<meditha-referencemanuscript class="block"></meditha-referencemanuscript>
			<br />
		</div>
		<div class="column2" style="margin-left:5px">
			<meditha-bhl-identification class="block"></meditha-bhl-identification>
			<br />
			<meditha-sponsor  class="block"></meditha-sponsor>
			<br />
			<meditha-author  class="block"></meditha-author>
			<br />
			<meditha-writing  class="block"></meditha-writing>
			<br />
			<meditha-dating  class="block"></meditha-dating>
		</div>
	</div>


</span>
</template>

<script>
	export default {
	props: {
	  	lang:  {
	      type: String,
	      default: 'en'
	    }
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

.row2 {
    display: flex;
}

.column2 {
    flex: 50%;
}

.meditha-source-display-host .block {
	margin-bottom: 5px 
 }
 
 </style>