<template>
<span class="meditha-source-edit-host">

<div class="row2">
		<div class="column2" style="margin-right:5px">
			<meditha-saint edit="true" class="block"></meditha-saint>
			<br />
			<meditha-publication-edit  class="block"></meditha-publication-edit>
			<br />
			<meditha-referencemanuscript edit="true" class="block"></meditha-referencemanuscript>
			<br />
			<meditha-bhl-identification-edit></meditha-bhl-identification-edit>
		</div>
		<div class="column2" style="margin-left:5px">
			<meditha-dating-edit  class="block"></meditha-dating-edit>
			<br />
			<meditha-sponsor-edit  class="block"></meditha-sponsor-edit>
			<br />
			<meditha-author-edit  class="block"></meditha-author-edit>
			<br />
			<meditha-writing-edit  class="block"></meditha-writing-edit>
			
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

.meditha-source-edit-host .block {
	margin-bottom: 5px 
 }
 
 </style>