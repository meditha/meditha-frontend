<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/referencemanuscript-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-circle-thin primary-color"></i>{{$t('referenceManuscriptForPublishing')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">

<table v-show="edit" width="100%" style="border-spacing: 0px;">
<tr>
<td align="left">
<span class="clickable" @click="openDatabaseModal()" style="text-decoration: underline;">{{$t('chooseFromCoteDatabase')}}</span>
</td>
<td align="right">
<span class="clickable" @click="reset()" v-show="hasReferenceManuscript" style="text-decoration: underline;">{{$t('reset')}}</span>
</td>
</tr>
</table>
    
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">

<tr><td><h5 class="primary-color">{{$t('cote')}}:</h5></td><td>
  {{cote}}</input>
 </td></tr>
 
 <tr><td><h5 class="primary-color">{{$t('role')}}:</h5></td><td>
  {{role}}</input>
 </td></tr> 

 <tr><td><h5 class="primary-color">{{$t('link')}}:</h5></td><td>
  {{link}} <i class="fa fa-link clickable" v-show="link" @click="openUrl(link)" :title="$t('clickToOpen')"></i></input>
 </td></tr>

 <tr><td><h5 class="primary-color">{{$t('bibliography')}}:</h5></td><td>
  {{bibliography}}</input>
 </td></tr>

</table>
</main>



<div class="meditha-opacity-layer"  v-show="modal"></div>

<div class="meditha-modal-container" v-show="modal">
<div class="meditha-modal-content"  style="z-index:100">
  <div class="meditha-modal-header">
  	<table style="width:100%;border: none;" cellspacing="0" cellpadding="0">
  	<tr>
  	<td style="text-align:left; border:none">   <h2>{{$t('referenceManuscriptsForPublishing')}}</h2> </td>
    <td style="text-align:right; border:none"> <span><i class="fa fa-times" @click="hideDatabaseModal" style="cursor:pointer"></i></span></td>
    </tr>
    </table>
  </div>
  <div class="meditha-modal-body">
  
  <table v-show="hasReferenceManuscripts"     style="border-spacing: 0px; width:100%">
 <col width="55%">
 <col width="5%">
 <col width="5%">
 <col width="5%">
<tr v-for="(referencemanuscript,index) in referencemanuscripts">
<td>{{ referencemanuscript.cote }} </td>
<td><i class="fa fa-arrow-circle-o-down fa-lg clickable" :title="$t('select')" @click='select(referencemanuscript)'></i> </td>
<td></td>
</tr>
</table>
  
  </div>
  <div style="text-align:center" v-show='hasPager'><i class="fa fa-caret-left fa-lg clickable" v-show="hasPrevious" @click="loadPreviousPage"></i> {{pageNumber}}/{{totalPages}} <i class="fa fa-caret-right fa-lg clickable" v-show="hasNext"  @click="loadNextPage"></i></div>
  <div class="meditha-modal-footer">
  <div >
  <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="hideDatabaseModal()"><span style="margin-left:3px">{{$t('cancel')}}</span></span>
  </div>
  </div>
</div>

</div>

</div>

</template>

<style>
@import './../commons/meditha-style.css';




</style>

<script>
export default {
  props: {
  
  	edit: {
      type: Boolean,
      default: false
    },
  

  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

 
  data() {
    return {
      visible: true,
      lang: 'en',
      metadataListener:true,
      metadata: null,
      modal: false,
      rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/referencemanuscript',
      hits:0,
   	  pageSize:0,
   	  pageNumber:1,
   	  referencemanuscripts:[]
    }
  },
  
  
   mounted: function() {
    var event = new CustomEvent('medithaThemeRequest', {});
    document.dispatchEvent(event);
  },

  destroyed: function() {
    document.removeEventListener('medithaTheme', this.medithaThemeListener);
    this.medithaThemeListener = null;
  },

  created: function() {
    this.medithaThemeListener = this.handleTheme.bind(this);
    document.addEventListener('medithaTheme', this.medithaThemeListener);
  },

  updated: function() {
    this.ensureTheme();
  },
  
  computed: {
  
   hasReferenceManuscripts: function() {
  	if (!this.referencemanuscripts) {
  		return false;
  	}
  	else {
  		return (this.referencemanuscripts.length > 0)
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
    
     hasReferenceManuscript: function() {
     if ((this.metadata) && (this.metadata.source)) {
     	return this.metadata.source.referencemanuscript != null
     }
     return false;
     },
     
     creationDate: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.creationDate
     }
     else {
     	return "";
     }
     },
     
     role: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	var role = this.metadata.source.referencemanuscript.role
     	if (role == 'other') {
     		if (this.metadata.source.referencemanuscript.otherRole) {
     			return this.metadata.source.referencemanuscript.otherRole
     		}
     	}
     	return role
     }
     else {
     	return "";
     }
     },
     
     cote: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.cote
     }
     else {
     	return "";
     }
     },
     
     bibliography: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.bibliography
     }
     else {
     	return "";
     }
     },
     
     link: function() {
     if ((this.metadata) && (this.metadata.source) && (this.metadata.source.referencemanuscript)) {
     	return this.metadata.source.referencemanuscript.link
     }
     else {
     	return "";
     }
     }
     
     		
     
     
  
    
    
  },

  methods: {
  
  reset: function() {
  	this.metadata.source.referencemanuscript = null
  },
  
  
   select: function(referencemanuscript) {
  	this.metadata.source.referencemanuscript = referencemanuscript
  	this.hideDatabaseModal();
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
    	this.referencemanuscripts=[]
      	this.hits=0
   	  	this.pageSize=0
   	  	this.pageNumber=1
    },
    
    
     hideDatabaseModal() {
    	this.modal = false;
    },
    
    
     openDatabaseModal() {
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
    	var url = this.rootUrl+'/list?pageNumber='+number;
   	 	this.$http.get(url).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('loading')}}))
   		this.hits=response.body.hits;
   		this.pageSize=response.body.pageSize;
   		this.pageNumber=response.body.pageNumber;
   		this.referencemanuscripts = response.body.detail;
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
