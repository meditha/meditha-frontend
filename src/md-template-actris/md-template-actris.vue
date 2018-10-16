<template>
<span class="md-template-collection-host">
<div class="metadata-container">
<div class="column">
 	<meditha-text-information></meditha-text-information>
</div>
<div class="column">
	<meditha-text-information></meditha-text-information>
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
  
  destroyed: function() {
  },
  
  created: function () {
  },

  mounted: function() {
	  
	  
  },
  
  computed: {
  },

   data () {
    return {
    }
  },
  
  updated: function() {
  },
  
  methods: {
  }
}
</script>

<style>

.md-template-collection-host {
	display: block;
	font-size: 14px;
	height: 70vh;
	overflow: scroll;
}

.md-template-collection-host * {
	box-sizing: border-box;
}

.md-template-collection-host .column .component-container {
	margin-bottom: 10px;
   
}

.md-template-collection-host .column~.column {
	margin-left: 10px;
}

.md-template-collection-host .column:first {
	margin-right:10px;
}

.md-template-collection-host * {
	box-sizing: border-box;
}

.md-template-collection-host .metadata-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}

.md-template-collection-host .metadata-container .column {
	width: 50%;
}

 </style>