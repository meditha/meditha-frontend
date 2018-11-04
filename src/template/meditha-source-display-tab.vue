<template>
<span class="meditha-source-display-host">

<div class="row2">
		<div class="column2" style="margin-right:5px">
			<meditha-publication  class="block"></meditha-publication>
			<br />
			<!-- 
			<meditha-manuscript  class="block"></meditha-manuscript>
			-->
			<br />
			<meditha-dating  class="block"></meditha-dating>
			<br />
			<meditha-sponsor  class="block"></meditha-sponsor>
			<br />
			<meditha-author  class="block"></meditha-author>
			<br />
			<meditha-bhl-identification></meditha-bhl-identification>
		</div>
		<div class="column2" style="margin-left:5px">
			<meditha-sponsor-edit  class="block"></meditha-sponsor-edit>
			<br />
			<meditha-bhl-identification-edit></meditha-bhl-identification-edit>
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