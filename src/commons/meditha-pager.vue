<i18n src="./locales.json"></i18n>
<template>
<span class="meditha-pager-host">

	<div class="meditha-opacity-layer"  v-show="modal"></div>
	
	<div class="meditha-modal-container" v-show="modal">
<div class="meditha-modal-content"  style="z-index:100">
  <div class="meditha-modal-header">
  	<table style="width:100%;border: none;" cellspacing="0" cellpadding="0">
  	<tr>
  	<td style="text-align:left; border:none">   <h2 v-show="selectmode">{{modaltitle}}</h2> <h2 v-show="editmode || createmode">{{edittitle}}</h2> </td>
    <td style="text-align:right; border:none"> <span><i class="fa fa-times" @click="hide" style="cursor:pointer"></i></span></td>
    </tr>
    </table>
  </div>
  <div class="meditha-modal-body" v-show="selectmode">
  
  <table v-show="hasItems"   class="meditha-table">
  
  <tr  v-show="labels">
  	<th style="text-align:left" v-for="label in labels">
  	{{label}}
  	</th>
  	<th class="meditha-table-action"></th>
  	<th class="meditha-table-action" v-show="editable"></th>
  	<th class="meditha-table-action" v-show="editable"></th>
  </tr>
  
  <tr v-for="(item, index) in items" >
  	<td style="text-align:left" v-for="column in columns">
  	{{item[column]}}
  	</td>
  	<td class="meditha-table-action"><i class="fa fa-arrow-circle-o-down fa-lg clickable" :title="$t('select')" @click='select(item)'></i></td>
  	<td class="meditha-table-action" v-show="editable"><i class="fa fa-pencil fa-lg clickable" :title="$t('edit')" @click='edit(item)'></i></td>
  	<td class="meditha-table-action" v-show="editable"><i class="fa fa-trash fa-lg clickable" :title="$t('delete')" @click='remove(item,item)'></i></td>
  </tr>

</table>
  
  <div style="text-align:center" v-show='hasPager'><i class="fa fa-caret-left fa-lg clickable" v-show="hasPrevious" @click="loadPreviousPage"></i> {{pageNumber}}/{{totalPages}} <i class="fa fa-caret-right fa-lg clickable" v-show="hasNext"  @click="loadNextPage"></i></div>
  </div>
  
  
   <div class="meditha-modal-body" v-show="editmode || createmode">
   <span v-html="editDynamicContent"></span>
    </div>
 
 
  <div class="meditha-modal-footer">
  <div v-show="selectmode">
  	 <span v-show="editable" style="cursor:pointer;margin-left:3px" class="meditha-button" @click="add()"><i class="fa fa-plus"></i> <span style="margin-left:3px">{{$t('add')}}</span></span>
 	 <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="hide()"><span style="margin-left:3px">{{$t('cancel')}}</span></span>
  </div>
  <div v-show="editmode">
     <span style="cursor:pointer;margin-left:3px" class="meditha-button meditha-button-success" @click="save()"><span style="margin-left:3px">{{$t('save')}}</span></span>
 	 <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="backToList()"><span style="margin-left:3px">{{$t('backToList')}}</span></span>
  </div>
  
  <div v-show="createmode">
     <span style="cursor:pointer;margin-left:3px" class="meditha-button meditha-button-success" @click="saveAndSelect()"><span style="margin-left:3px">{{$t('saveAndSelect')}}</span></span>
 	 <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="backToList()"><span style="margin-left:3px">{{$t('backToList')}}</span></span>
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
    
    edittitle:  {
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
    },
    
    editcomponent: {
      type: String,
      default: null
 
    },
    
    editable: {
      type: Boolean,
      default: false
 
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
    document.removeEventListener('medithaPagerSaveResponse', this.medithaPagerSaveResponseListener);
    this.medithaPagerSaveResponseListener = null;
  },

  created: function() {
    this.medithaPagerListener = this.handlePagerShowEvent.bind(this);
    document.addEventListener('medithaPagerShowEvent', this.medithaPagerListener);
     this.medithaPagerSaveResponseListener = this.handlePagerSaveResponse.bind(this);
    document.addEventListener('medithaPagerSaveResponse', this.medithaPagerSaveResponseListener);
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
    },
    
    editmode: function() {
    	return this.mode=="edit";
    },
    
     selectmode: function() {
    	return this.mode=="select";
    },
    
    createmode: function() {
    	return this.mode=="create";
    },
    
    editDynamicContent: function() {
    
     return "<"+this.editcomponent+"></"+this.editcomponent+">";
    }
 
  },
  
  mounted: function() {
  },
  
  data () {
    return {
    	lang: 'en',
     	modal: false,
     	medithaPagerListener: null,
     	medithaPagerSaveResponseListener: null,
     	items:[],
     	hits:0,
   	  	pageSize:0,
   	  	pageNumber:1,
   	  	mode: 'select',
   	  	selectAfterSave: false
    }
  },
  
  methods: {
  
  backToList: function() {
  	this.mode = 'select'
  },
  
  select: function(item) {
  	var event = { 'detail': {item: item, collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerSelectEvent', event))
  	this.hide();
  },
  
  edit: function(item) {
  	this.mode = 'edit';
  	var event = { 'detail': {item: item, collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerEditEvent', event))
  },
  
  add: function() {
  this.mode = 'create'
  var newItem = {_id: this.generateUuid() }
  var event = { 'detail': {item: newItem, collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerEditEvent', event))
  },
  
  handlePagerShowEvent: function(e) {
  if (e.detail.collection == this.collection) {
  		this.open()
	  }
  },
  
 
  remove: function(item, index) {
    
    	console.log("debut suppression");
    	document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
    	var url = this.getRootUrl()+'/'+this.collection+"/"+item._id;
    this.$http.delete(url).then(response => {
    console.log("suppression réussie");
    
    document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
    document.dispatchEvent(new CustomEvent('medithaNotificationMessageEvent', { 'detail': {message: this.$i18n.t('deletionCompleted')}}))
    
    var newItems = [];
   		
   		for (var i = 0; i < this.items.length; i++) {
   			if (this.items[i]._id == item._id) {
   			} else {
   				newItems.push(this.items[i])
   			}
   		}
  		this.items = newItems
    
	this.refreshPage()
  }, response => {
  this.loading = false;
  	document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
  	console.log("Echec suppression");
  	console.log(response);
  });
    	
    
    },
 
 
 handlePagerSaveResponse: function(e) {
  	if (e.detail.collection == this.collection) {
  		var savingMessage = this.$i18n.t('saving');
  	    var item = e.detail.item
      
      	var url = this.getRootUrl()+'/'+this.collection+"/"+item._id;
      	 document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: savingMessage}}))
   	 	this.$http.post(url, {"detail":item}).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: savingMessage}}))
   		document.dispatchEvent(new CustomEvent('medithaNotificationMessageEvent', { 'detail': {message: this.$i18n.t('savingSuccessful')}}))
   		this.mode = 'select';
   		
   		var newItems = [];
   		
   		for (var i = 0; i < this.items.length; i++) {
   			if (this.items[i]._id == item._id) {
   				newItems.push(item)
   			} else {
   				newItems.push(this.items[i])
   			}
   		}
  		this.items = newItems
  		if (this.selectAfterSave) {
  			this.select(item)
  		} 
   		
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: savingMessage}}))
  	});
      
  		
  		
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
    
    initModal: function() {
   		this.mode = 'select';
    	this.items=[]
      	this.hits=0
   	  	this.pageSize=0
   	  	this.pageNumber=1
   	  	this.selectAfterSave = false
    },
    
     hide: function() {
    	this.modal = false;
    },
    
    
     open: function() {
    	this.initModal()
    	this.modal = true;
    	this.loadPage(this.pageNumber, this.$i18n.t('loading'))
    },
    
  	save: function() {
  	var event = { 'detail': {collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerSaveRequest', event))
  	
  	
  	},
  	
  	saveAndSelect: function() {
  	this.selectAfterSave=true
  	var event = { 'detail': {collection: this.collection}}
	document.dispatchEvent(new CustomEvent('medithaPagerSaveRequest', event))
  	},
    
    loadNextPage: function() {
    	this.loadPage(this.pageNumber+1, this.$i18n.t('loading'));
    },
    
    loadPreviousPage: function() {
    	this.loadPage(this.pageNumber-1,this.$i18n.t('loading'));
    },
    
    refreshPage: function() {
    	this.loadPage(this.pageNumber, this.$i18n.t('refreshing'))
    },
    
    loadPage: function(number, message) {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: message}}))
    	var url = this.getRootUrl()+'/'+this.collection+'/list?pageNumber='+number;
   	 	this.$http.get(url).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: message}}))
   		this.hits=response.body.hits;
   		this.pageSize=response.body.pageSize;
   		this.pageNumber=response.body.pageNumber;
   		this.items = response.body.detail;
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: message}}))
  		console.log("Echec creation");
  		console.log(response);
  		});
    
    }
  
  
  
  }
}
</script>

<style>
  
</style>