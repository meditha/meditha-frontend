<template>
<span class="meditha-manuscript-edit-host">

<div class="row2">
		<div class="column2" style="margin-right:5px">
			<meditha-general-inventory   class="block"></meditha-general-inventory>
			<br />
		</div>
		<div class="column2" style="margin-left:5px">
			
			
		</div>
	</div>


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

.row2 {
    display: flex;
}

.column2 {
    flex: 50%;
}

.meditha-manuscript-edit-host .block {
	margin-bottom: 5px 
 }
 
 </style>