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
<tr><td><h5 class="primary-color">{{$t('type')}}:</h5></td><td> <select class="meditha-select" v-model="authorType">
<option value="anonymous">{{$t('anonymous')}}</option>
<option value="anonymousman">{{$t('anonymousman')}}</option>
<option value="anonymouswoman">{{$t('anonymouswoman')}}</option>
<option value="man">{{$t('man')}}</option>
<option value="woman">{{$t('woman')}}</option>
</select> </td></tr>
<tr v-show="isKnownAuthor">
 <span  class="meditha-button" @click="openDatabaseModal()" :title="$t('chooseFromAuthorDatabase')"><i class="fa fa-user-plus"></i></span>
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('name')}}:</h5></td><td><input  style="margin-top: 4px;" class="meditha-input" v-model="otherSponsorType"  ></input></td></tr>

</table>
</main>

<div class="meditha-opacity-layer"  v-show="modal"></div>

<div class="meditha-modal-container" v-show="modal">
<div class="meditha-modal-content"  style="z-index:100">
  <div class="meditha-modal-header">
  	<table style="width:100%;border: none;" cellspacing="0" cellpadding="0">
  	<tr>
  	<td style="text-align:left; border:none">   <h2>{{$t('authors')}}</h2> </td>
    <td style="text-align:right; border:none"> <span><i class="fa fa-times" @click="hideDatabaseModal" style="cursor:pointer"></i></span></td>
    </tr>
    </table>
  </div>
  <div class="meditha-modal-body">
  
  <table v-show="hasAuthors"     style="border-spacing: 0px">
 <col width="55%">
 <col width="5%">
 <col width="5%">
 <col width="5%">
<tr v-for="(author,index) in authors">
<td><i :class="['fa', author.gender=='m' ? 'fa-male' : 'fa-female']" style='margin-right:3px'></i>{{ author.name }}</td>
<td> </td>
<td><i class="fa fa-pencil" :title="$t('edit')"  @click='edit(record)'> </i> </td>
<td></td>
</tr>
</table>
  
  </div>
  <div class="meditha-modal-footer">
 
   
  <span style="cursor:pointer;margin-left:3px" class="meditha-button" @click="hideDatabaseModal()"><span style="margin-left:3px">{{$t('cancel')}}</span></span>
  </div>
</div>

</div>

</div>

</template>

<style>
@import './../commons/meditha-style.css';

.sublabel.noleftborder {
	padding-left: 0px;
}

.sublabel h5{
	padding-left: 10px;
}

.sublabel {
	border-left : 1px solid #ccc;
}

.meditha-text-information-host ul {
    list-style: none;
}

.meditha-text-information-host li {
	display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.meditha-text-information-host li h5 {
	margin-right: 10px;
	font-size: 1rem;
    font-weight: 400;
    margin: 0;
}  

.meditha-text-information-host li p {
    margin: 0;
    margin-left: 10px;
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
      visible: true,
      lang: 'en',
      metadataListener:true,
      metadata: null,
      modal: false,
      rootUrl: 'https://bkm52iy1s7.execute-api.eu-west-3.amazonaws.com/Dev/author',
      authors:[]
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
  
   hasAuthors: function() {
  	if (!this.authors) {
  		return false;
  	}
  	else {
  		return (this.authors.length > 0)
  	}
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
		
		set: function(value) {
			if (!this.metadata.source.author) {
				this.metadata.source.author = {}
			}
			this.metadata.source.author.type=value;
		}     
		
    },
    
    isKnownAuthor: function() {
    	if (this.authorType =='man' || this.authorType =='woman') {
    		return true;
    	}
    	else {
    		return false;
    	}
    },
    
    otherSponsorType: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.otherSponsorType;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
		if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
				if (this.metadata.source.sponsor.type =='other') {
					this.metadata.source.sponsor.otherSponsorType=value;
				}
				else {
					this.metadata.source.sponsor.otherSponsorType=null
				}
		}     
		
    },
  
    sponsorName: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.sponsor.name;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
			this.metadata.source.sponsor.name=value;
		}     
		
    },
    
    
    sponsorPlaceOfLife: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
				return this.metadata.source.sponsor.placeOfLife;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.sponsor) {
				this.metadata.source.sponsor = {}
			}
			this.metadata.source.sponsor.placeOfLife=value;
		}     
		
    },
    
    
  },

  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },
    
    hideDatabaseModal() {
    	this.modal = false;
    },
    
    openDatabaseModal() {
    	this.modal = true;
    	document.dispatchEvent(new CustomEvent('medithaLongActionStartEvent', { 'detail': {message: this.$i18n.t('loading')}}))
    	var url = this.rootUrl+'/list';
   	 	this.$http.get(url).then(response => {
   		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('loading')}}))
   		console.log("RRRRRR")
   		this.authors = response.body.detail;
		}, response => {
  		this.loading = false;
  		document.dispatchEvent(new CustomEvent('medithaLongActionStopEvent', { 'detail': {message: this.$i18n.t('loading')}}))
  		console.log("Echec creation");
  		console.log(response);
  		});
    	
    },

    ensureTheme: function() {
    
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primary);
    	}
    
    }
  }
}
</script>
