<i18n>
{
  "en": {
    "loading": "Loading ...",
    "view": "View",
    "edit": "Edit",
    "delete": "Delete",
    "deleting":"Please wait while deleting...",
    "deletionCompleted":"Deletion completed"
  },
  "fr": {
  	"loading": "Chargement ...",
  	"view": "Voir",
    "edit": "Editer",
    "delete": "Supprimer",
    "deleting": "Suppression en cours...",
    "deletionCompleted":"Suppression terminée"
    
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
<td><i class="fa fa-eye" :title="$t('view')"></i> </td>
<td><i class="fa fa-pencil" :title="$t('edit')"> </i> </td>
<td><i class="fa fa-trash" :title="$t('delete')" @click='remove(record,index)'></i> </td>
</tr>
</table>
<span style='font-size:12px' v-show="loading == false">{{records.length}} items.</span>
</div>
</template>

<style>

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

</style>

<script>
export default {
  props: {

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
      rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/metadata'
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
    console.log(response.status);

  }, response => {
  this.loading = false;
  document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: loadingMessage}}))
  	console.log("KO");
  	console.log(response);
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
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    
    }
  }
}
</script>
