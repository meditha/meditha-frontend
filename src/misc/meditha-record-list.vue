<i18n>
{
  "en": {
    "loading": "Loading ...",
    "view": "View",
    "edit": "Edit",
    "delete": "Delete",
    "add": "Ajouter",
    "deleting":"Please wait while deleting...",
    "deletionCompleted":"Deletion completed",
    "bhlInstructions": "Indicate the BHL number: ",
    "cancel": "Cancel",
    "creation": "Creation",
    "validate": "Validate",
    "creating": "Creating ...",
    "creationSuccess": "Creation successful"
    
  },
  "fr": {
  	"loading": "Chargement ...",
  	"view": "Voir",
    "edit": "Editer",
    "add": "Ajouter",
    "delete": "Supprimer",
    "deleting": "Suppression en cours...",
    "deletionCompleted":"Suppression terminée",
    "bhlInstructions": "Indiquez le numéro BHL: ",
    "cancel": "Annuler",
    "creation": "Création",
    "validate": "Valider",
    "creating": "Création ...",
    "creationSuccess": "Création réussie" 
   }
}
</i18n>

<template>
<div class="meditha-record-list-host">
<table v-show="hasRecords"     style="border-spacing: 0px">
 <col width="55%">
 <col width="5%">
 <col width="5%">
 <col width="5%">
<tr v-for="(record,index) in records">
<td>{{ record.source.bhlIdentifier }}</td>
<td><i class="fa fa-eye" :title="$t('view')" @click='display(record)'></i> </td>
<td><i class="fa fa-pencil" :title="$t('edit')"  @click='edit(record)'> </i> </td>
<td><i class="fa fa-trash" :title="$t('delete')" @click='remove(record,index)'></i> </td>
</tr>
</table>
<span style='font-size:12px' v-show="loading == false">{{records.length}} items.</span>
<div class="cartouche-container" v-show="hasRecords">
<span style="cursor:pointer" class="cartouche primary-background primary-text" @click="openModal()"><i class="fa fa-plus"></i><span style="margin-left:3px">{{$t('add')}}</span></span>
</div>

<div class="meditha-opacity-layer"  v-show="modal"></div>

<div class="meditha-modal-content" v-show="modal" style="z-index:100">
  <div class="meditha-modal-header">
  	<table style="width:100%;border: none;" cellspacing="0" cellpadding="0">
  	<tr>
  	<td style="text-align:left; border:none">   <h2>{{$t('creation')}}</h2> </td>
    <td style="text-align:right; border:none"> <span><i class="fa fa-times" @click="hideModal" style="cursor:pointer"></i></span></td>
    </tr>
    </table>
  </div>
  <div class="meditha-modal-body">
    <p>{{$t('bhlInstructions')}}<input class="meditha-input" style="width:50%" v-model="newBhl" ></input></p> 
  </div>
  <div class="meditha-modal-footer">
   <span :style="{cursor:validateCursor}" class="cartouche" @click="validate()"><span style="margin-left:3px">{{$t('validate')}}</span></span>
   
  <span style="cursor:pointer;margin-left:3px" class="cartouche" @click="hideModal()"><span style="margin-left:3px">{{$t('cancel')}}</span></span>
  </div>
</div>





</div>




</template>

<style>
@import './../commons/meditha-style.css';


.meditha-record-list-host table {

}

.meditha-record-list-host table td i.fa {
	cursor: pointer;
}

.meditha-record-list-host table td {
	border: 1px solid white; 
	border-bottom: 1px solid #969696; 
	padding: 3px;
}

.meditha-record-list-host .cartouche-container {
	margin: 3px 0px 3px 0px;
}

.meditha-record-list-host .cartouche {
    padding: 4px 6px 6px;
    border-radius: 5px;
    font-weight: normal;
    
    font-variant: small-caps;
    font-size: 18px;
    background: #dcdcdc;
    cursor: pointer
}


</style>

<script>
export default {
  props: {
  	displayurl:  {
      type: String,
      default: null
    },
    editurl:  {
      type: String,
      default: null
    }

  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

 
  data() {
    return {
      lang: 'en',
      loading: true,
      records: [],
      rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/metadata',
      modal: false,
      newBhl: null
    }
  },
  
   mounted: function() {
    var event = new CustomEvent('medithaThemeRequest', {});
    document.dispatchEvent(event);
    var url = this.rootUrl+'/list';
    var loadingMessage = this.$i18n.t('loading')
    document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: loadingMessage}}))
    this.$http.get(url).then(response => {
    // get body data
    this.loading = false;
    document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: loadingMessage}}))
    this.records = response.body.detail;

  }, response => {
  this.loading = false;
  document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: loadingMessage}}))
  });
    
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
  
  validateCursor: function() {
  	if (this.newBhl) {
  		return "pointer";
  	} else {
  		return "not-allowed";
  	}
  },
  
  hasRecords: function() {
  	if (!this.records) {
  		return false;
  	}
  	else {
  		return (this.records.length > 0)
  	}
  }
  
  },

  methods: {
  
   uuid: function() {
  	function s4() {
    	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  	}
  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	},
	
	validate: function() {
	this.hideModal();
	document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('creating')}}))
		var aux = this.newBhl.toUpperCase();
		if (!aux.includes("BHL")) {
			aux = "BHL "+aux;
		}
		var uuid = this.uuid();
		var newRecord = {"_id": uuid,"source":{"bhlIdentifier":aux}}
   	 	var url = this.rootUrl+'/'+uuid;
   	 	this.$http.post(url, {"detail": newRecord}).then(response => {
   		console.log("Création réussie");
   		this.records.push(newRecord)
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('creating')}}))
   		document.dispatchEvent(new CustomEvent('medithaNotificationMessageEvent', { 'detail': {message: this.$i18n.t('creationSuccess')}}))
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('creating')}}))
  		console.log("Echec creation");
  		console.log(response);
  		});
	
	
	},
  
  
  	hideModal: function() {
  		this.modal=false;
  	},
  	
  	openModal: function() {
  		this.modal = true;
  	},
  
    remove: function(record,index) {
    
    	console.log("debut suppression");
    	document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
    	 var url = this.rootUrl+'/'+record._id;
    this.$http.delete(url).then(response => {
    console.log("suppression réussie");
    this.records.splice(index, 1)
    document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
    document.dispatchEvent(new CustomEvent('medithaNotificationMessageEvent', { 'detail': {message: this.$i18n.t('deletionCompleted')}}))

  }, response => {
  this.loading = false;
  	document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('deleting')}}))
  	console.log("Echec suppression");
  	console.log(response);
  });
    	
    
    },
    
    display: function(record) {
    	if (this.displayurl) {
    		document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('loading')}}))
    		var url = this.displayurl+"?uuid="+record._id;
    		window.location.href = url;
    	}
    },
    
    edit: function(record) {
    	if (this.editurl) {
    		document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('loading')}}))
    		var url = this.editurl+"?uuid="+record._id;
    		window.location.href = url;
    	}
    },
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    	if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-background").forEach(el => el.style.background = this.theme.primary);
    	 if (this.theme.primarytext) {
    			this.$el.querySelectorAll(".primary-text").forEach(el => el.style.color = this.theme.primarytext);
    		}
    	}
    
    }
  }
}
</script>
