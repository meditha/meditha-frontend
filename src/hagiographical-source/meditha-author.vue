<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/author-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('author')}}</h3>
  </header>
<main class="meditha-text-sponsor-host">
<table width="100%" style="border-spacing: 0px;">
 <col width="25%">
 <col width="75%">
 
<tr v-show="!isAnonymous">
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('name')}}:</h5></td><td>{{authorName}} <i class="fa fa-link clickable" v-show="authorUrl" @click="openUrl(authorUrl)"></i></td>
</tr>
<tr v-show="isAnonymous">
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('name')}}:</h5></td><td>{{$t('anonymous')}}</i></td>
</tr>
<tr >
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('gender')}}:</h5></td><td>{{$t(authorGender)}}</td>
</tr>
<tr >
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('status')}}:</h5></td><td>{{authorStatus}}</td>
</tr>

<tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('connections')}}</span></td></tr>
<tr  >
<td class="sublabel" style="vertical-align: top;"><h5 class="primary-color" >{{$t('withTheSponsor')}}:</h5></td>
	<td>{{sponsorConnexions}}</td>
</tr>

<tr  >
<td class="sublabel" style="vertical-align: top;"><h5 class="primary-color" >{{$t('withTheRecipients')}}:</h5></td>
	<td>{{recipientConnexions}}</td>
</tr>
  
</table>
</main>
</div>

</template>

<style>


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
      visible: true,
      lang: 'en',
      metadataListener:true,
      metadata: null
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
  
  	isAnonymous: function() {
		return this.authorType == 'anonymous';
	},
  
   authorType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.type;
			}
			else {
				return null;
			}
		},
		
    },
    
    authorName: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.name;
			}
			else {
				return null;
			}
		}   
		
    },
    
     authorGender: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.gender;
			}
			else {
				return null;
			}
		}   
		
    },
    
     authorStatus: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				if (this.metadata.source.author.status) {
				
					var result = [];
					for (var i = 0; i < this.metadata.source.author.status.length; i++) {
					result.push(this.$i18n.t(this.metadata.source.author.status[i]))
					}
				
					return result.join(", ")
				}
			}
			else {
				return "";
			}
		}  
		
    },
    
     sponsorConnexions: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				if (this.metadata.source.author.sponsorConnexions) {
				
					var result = [];
					for (var i = 0; i < this.metadata.source.author.sponsorConnexions.length; i++) {
					result.push(this.$i18n.t(this.metadata.source.author.sponsorConnexions[i]))
					}
				
					return result.join(", ")
				}
			}
			else {
				return "";
			}
		}  
		
    },
    
     recipientConnexions: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				if (this.metadata.source.author.recipientConnexions) {
				
					var result = [];
					for (var i = 0; i < this.metadata.source.author.recipientConnexions.length; i++) {
					result.push(this.$i18n.t(this.metadata.source.author.recipientConnexions[i]))
					}
				
					return result.join(", ")
				}
			}
			else {
				return "";
			}
		}  
		
    },
    
    
     authorUrl: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.url;
			}
			else {
				return null;
			}
		}  
    }
    
    
  },

  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel").forEach(el => el.style.borderLeftColor = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel-title").forEach(el => el.style.background = this.theme.primary);
    	}
    
    }
  }
}
</script>
