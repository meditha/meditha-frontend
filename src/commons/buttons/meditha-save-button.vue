<i18n>
{
  "en": {
    "save": "Save",
    "saving": "Saving...",
    "savingSuccessul": "Saved successfully"
  },
  "fr": {
    "save": "Sauvegarder",
    "saving": "Sauvegarde en cours...",
    "savingSuccessul": "Sauvegarde réussie"
  }
}
</i18n>

<template>
<meditha-button icon="fa-save" theme="primary" :title="$t('save')" @click="handleSave"></meditha-button>
</template>

<script>
export default {

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  created: function() {
    this.$i18n.locale = this.lang

  },

  data() {
    return {
      metadataListener:true,
      metadata: null,
      rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/metadata'
    }
  },

  methods: {
    handleSave: function() {
      console.log("Save...")
      var savingMessage = this.$i18n.t('saving');
      
      	var url = this.rootUrl+'/'+this.metadata._id;
      	 document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: savingMessage}}))
   	 	this.$http.post(url, {"detail":this.metadata}).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: savingMessage}}))
   		document.dispatchEvent(new CustomEvent('medithaNotificationMessageEvent', { 'detail': {message: this.$i18n.t('savingSuccessul')}}))
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: savingMessage}}))
  	});
      
      
    }
  }
}
</script>
