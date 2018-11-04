<i18n src="./locales.json"></i18n>
<template>
<span class="meditha-pager-host">

	<div class="meditha-opacity-layer"  v-show="modal"></div>
	
	<div class="meditha-modal-container" v-show="modal">
<div class="meditha-modal-content"  style="z-index:100">
  <div class="meditha-modal-header">
  	<table style="width:100%;border: none;" cellspacing="0" cellpadding="0">
  	<tr>
  	<td style="text-align:left; border:none">   <h2>{{modaltitle}}</h2> </td>
    <td style="text-align:right; border:none"> <span><i class="fa fa-times" @click="hide" style="cursor:pointer"></i></span></td>
    </tr>
    </table>
  </div>
  <div class="meditha-modal-body">
  
  <table v-show="hasItems"     style="border-spacing: 0px; width:100%">
  
  <tr  v-show="labels">
  	<th style="text-align:left" v-for="label in labels">
  	{{label}}
  	</th>
  	<th></th>
  </tr>
  
  <tr v-for="item in items" >
  	<td style="text-align:left" v-for="column in columns">
  	{{item[column]}}
  	</td>
  	<td><i class="fa fa-arrow-circle-o-down fa-lg clickable" :title="$t('select')" @click='select(item)'></i></td>
  </tr>

</table>
  
  </div>
  <div style="text-align:center" v-show='hasPager'><i class="fa fa-caret-left fa-lg clickable" v-show="hasPrevious" @click="loadPreviousPage"></i> {{pageNumber}}/{{totalPages}} <i class="fa fa-caret-right fa-lg clickable" v-show="hasNext"  @click="loadNextPage"></i></div>
  <div class="meditha-modal-footer">
  <div >
  <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="hide()"><span style="margin-left:3px">{{$t('cancel')}}</span></span>
  </div>
  </div>
</div>

</div>

</span>
</template>


<script>
export default {
  props: {
  	collection:  {
      type: String,
      default: null
    },
    
    modaltitle:  {
      type: String,
      default: null
    },
    
    tablelabels:  {
      type: String,
      default: null
    },
    
    tablecolumns:  {
      type: String,
      default: null
    }
    
  
},
  
   
 watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },
  
  destroyed: function() {
    document.removeEventListener('medithaPagerShowEvent', this.medithaPagerListener);
    this.medithaThemeListener = null;
  },

  created: function() {
    this.medithaPagerListener = this.handlePagerShowEvent.bind(this);
    document.addEventListener('medithaPagerShowEvent', this.medithaPagerListener);
  },
  
  computed: {
  
  hasItems: function() {
  	if (!this.items) {
  		return false;
  	}
  	else {
  		return (this.items.length > 0)
  	}
  },
  
   hasPager: function() {
    	return this.hits>this.pageSize;
    },
    
    
    hasPrevious: function() {
    	return this.pageNumber>1;
    },
    
    hasNext: function() {
    	return this.pageNumber<this.totalPages;
    },
    
    totalPages: function() {
    	if (this.pageSize == 0) {
    		return 0
    	} else {
    		return Math.ceil(this.hits/this.pageSize)
    	}
    },
    
    labels: function() {
    	return this.tablelabels.split(',');
    },
    
     columns: function() {
    	return this.tablecolumns.split(',');
    }
 
  },
  
  mounted: function() {
  },
  
  data () {
    return {
    	lang: 'en',
     	modal: false,
     	medithaPagerListener: null,
     	items:[],
     	hits:0,
   	  	pageSize:0,
   	  	pageNumber:1,
    }
  },
  
  methods: {
  
  select: function(item) {
  	var event = { 'detail': {item: item, collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerSelectEvent', event))
  	this.hide();
  },
  
  handlePagerShowEvent: function(e) {
  if (e.detail.collection == this.collection) {
  		this.open()
	  }
  },
 
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	}
    
    },
    
    initModal() {
    	this.items=[]
      	this.hits=0
   	  	this.pageSize=0
   	  	this.pageNumber=1
    },
    
    
     hide() {
    	this.modal = false;
    },
    
    
     open() {
    	this.initModal()
    	this.modal = true;
    	this.loadPage(this.pageNumber)
    	
    	
    },
    
  
    
    loadNextPage: function() {
    	this.loadPage(this.pageNumber+1);
    },
    
    loadPreviousPage: function() {
    	this.loadPage(this.pageNumber-1);
    },
    
    loadPage: function(number) {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('loading')}}))
    	var url = this.getRootUrl()+'/'+this.collection+'/list?pageNumber='+number;
   	 	this.$http.get(url).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('loading')}}))
   		this.hits=response.body.hits;
   		this.pageSize=response.body.pageSize;
   		this.pageNumber=response.body.pageNumber;
   		this.items = response.body.detail;
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('loading')}}))
  		console.log("Echec creation");
  		console.log(response);
  		});
    
    }
  
  
  
  }
}
</script>

<style>
  
</style>