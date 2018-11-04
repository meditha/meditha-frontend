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
<tr><td><h5 class="primary-color">{{$t('type')}}:</h5></td><td> <select class="meditha-select" v-model="authorType" @change="resetAuthor">
<option value="anonymous">{{$t('anonymous')}}</option>
<option value="known">{{$t('known')}}</option>
</select> </td></tr>
<tr v-show="isKnown">
<td colspan="2">
<span class="clickable" @click="openDatabaseModal()" style="text-decoration: underline;">{{$t('chooseFromAuthorDatabase')}}</span>
</td>
<tr v-show="isKnown">
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('name')}}:</h5></td><td>{{authorName}} <i class="fa fa-link clickable" v-show="authorUrl" @click="openUrl(authorUrl)" :title="$t('clickToOpen')"></i></td>
</tr>
<tr v-show="isKnown">
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('gender')}}:</h5></td><td>{{$t(authorGender)}}</td>
</tr>
<tr v-show="isKnown">
<td  style="vertical-align: top;"><h5 class="primary-color">{{$t('status')}}:</h5></td><td>{{authorStatus}}</td>
</tr>

<tr v-show="isAnonymous">
<td><h5 class="primary-color">{{$t('gender')}}:</h5></td><td><select class="meditha-select" v-model="authorGender" @change="resetStatus">
<option value="m">{{$t('m')}}</option>
<option value="f">{{$t('f')}}</option>
</select></td>
</tr>

<tr v-if="isAnonymousWoman">
<td><h5 class="primary-color">{{$t('status')}}:</h5></td><td>
  <input type="checkbox" id="chk1" value="unknown" v-model="lauthorStatus"/>  <label for="chk1">{{$t('unknown')}}</label>
  <input type="checkbox" id="chk2" value="secular" v-model="lauthorStatus"/>  <label for="chk2">{{$t('secular')}}</label>
  <input type="checkbox" id="chk3" value="nun" v-model="lauthorStatus"/>  <label for="chk3">{{$t('nun')}}</label>
  <input type="checkbox" id="chk4" value="abbess" v-model="lauthorStatus"/>  <label for="chk4">{{$t('abbess')}}</label>
  <input type="checkbox" id="chk5" value="canoness" v-model="lauthorStatus"/>  <label for="chk5">{{$t('canoness')}}</label>
  <input type="checkbox" id="chk6" value="schoolResponsible" v-model="lauthorStatus"/>  <label for="chk6">{{$t('schoolResponsible')}}</label>
</td>
</tr>

<tr  v-show="isAnonymousMan">
<td><h5 class="primary-color">{{$t('status')}}:</h5></td>
<td>
<input type="checkbox" id="chk7" value="unknown" v-model="lauthorStatus"/>  <label for="chk7">{{$t('unknown')}}</label>
  <input type="checkbox" id="chk8" value="maleSecular" v-model="lauthorStatus"/>  <label for="chk8">{{$t('maleSecular')}}</label>
  <input type="checkbox" id="chk9" value="bishop" v-model="lauthorStatus"/>  <label for="chk9">{{$t('bishop')}}</label>
  <input type="checkbox" id="chk10" value="monk" v-model="lauthorStatus"/>  <label for="chk10">{{$t('monk')}}</label>
  <input type="checkbox" id="chk11" value="abbot" v-model="lauthorStatus"/>  <label for="chk11">{{$t('abbot')}}</label>
  <input type="checkbox" id="chk12" value="canon" v-model="lauthorStatus"/>  <label for="chk12">{{$t('canon')}}</label>
  <input type="checkbox" id="chk13" value="schoolMaster" v-model="lauthorStatus"/>  <label for="chk13">{{$t('schoolMaster')}}</label>
</td>
</tr>


<tr><td class="sublabel noleftborder" colspan="2"><span class="sublabel-title" style="color:white;background:#ccc;font-variant: small-caps;padding: 1px 5px 1px 5px">{{$t('connections')}}</span></td></tr>
<tr  >
<td class="sublabel" style="vertical-align: top;"><h5 class="primary-color" >{{$t('withTheSponsor')}}:</h5></td>
<td>
<input type="checkbox" id="chk20" value="unspecified" v-model="lsponsorConnexions"/>  <label for="chk20">{{$t('unspecified')}}</label><br />
  <input type="checkbox" id="chk21" value="disciple" v-model="lsponsorConnexions"/>  <label for="chk21">{{$t('disciple')}}</label><br />
  <input type="checkbox" id="chk22" value="sameMonasticCommunityMember" v-model="lsponsorConnexions"/>  <label for="chk22">{{$t('sameMonasticCommunityMember')}}</label><br />
  <input type="checkbox" id="chk23" value="associatedMonasticCommunityMember" v-model="lsponsorConnexions"/>  <label for="chk23">{{$t('associatedMonasticCommunityMember')}}</label><br />
  <input type="checkbox" id="chk24" value="sameCanonicalCommunityMember" v-model="lsponsorConnexions"/>  <label for="chk24">{{$t('sameCanonicalCommunityMember')}}</label><br />
  <input type="checkbox" id="chk25" value="clergyMember" v-model="lsponsorConnexions"/>  <label for="chk25">{{$t('clergyMember')}}</label><br />
  <input type="checkbox" id="chk26" value="familyNetworkMember" v-model="lsponsorConnexions"/>  <label for="chk26">{{$t('familyNetworkMember')}}</label><br />
  <input type="checkbox" id="chk27" value="friendshipConnection" v-model="lsponsorConnexions"/>  <label for="chk27">{{$t('friendshipConnection')}}</label><br />
  <input type="checkbox" id="chk28" value="schoolCommunityMember" v-model="lsponsorConnexions"/>  <label for="chk28">{{$t('schoolCommunityMember')}}</label><br />
  <br/>
</td>
</tr>
<td class="sublabel"><h5 class="primary-color">{{$t('withTheRecipients')}}:</h5></td>
<td>
<input type="checkbox" id="chk30" value="unspecified" v-model="lrecipientConnexions"/>  <label for="chk30">{{$t('unspecified')}}</label><br />
  <input type="checkbox" id="chk31" value="disciple" v-model="lrecipientConnexions"/>  <label for="chk31">{{$t('disciple')}}</label><br />
  <input type="checkbox" id="chk32" value="sameCommunityMember" v-model="lrecipientConnexions"/>  <label for="chk32">{{$t('sameCommunityMember')}}</label><br />
  <input type="checkbox" id="chk33" value="schoolMasterOrAssimilated" v-model="lrecipientConnexions"/>  <label for="chk33">{{$t('schoolMasterOrAssimilated')}}</label><br />
  <input type="checkbox" id="chk36" value="familyNetworkMember" v-model="lrecipientConnexions"/>  <label for="chk36">{{$t('familyNetworkMember')}}</label><br />
  <input type="checkbox" id="chk37" value="friendshipConnection" v-model="lrecipientConnexions"/>  <label for="chk37">{{$t('friendshipConnection')}}</label><br />
  <input type="checkbox" id="chk38" value="schoolCommunityMember" v-model="lrecipientConnexions"/>  <label for="chk38">{{$t('schoolCommunityMember')}}</label><br />
  
</td>
</tr>



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
  
  <table v-show="hasAuthors"     style="border-spacing: 0px; width:100%">
 <col width="55%">
 <col width="5%">
 <col width="5%">
 <col width="5%">
<tr v-for="(author,index) in authors">
<td><i :class="['fa fa-lg', author.gender=='m' ? 'fa-male' : 'fa-female']" style='margin-right:3px'></i>{{ author.name }} </td>
<td><i class="fa fa-arrow-circle-o-down fa-lg clickable" :title="$t('select')" @click='select(author)'></i> </td>
<td><i class="fa fa-pencil fa-lg" :title="$t('edit')"  @click='edit(record)'> </i> </td>
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
    },
    
    lauthorStatus(value) {
    	this.metadata.source.author.status=this.lauthorStatus
    },
    lsponsorConnexions(value) {
    	this.metadata.source.author.sponsorConnexions=this.lsponsorConnexions
    },
    lrecipientConnexions(value) {
    	this.metadata.source.author.recipientConnexions=this.lrecipientConnexions
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
      authors:[],
      hits:0,
   	  pageSize:0,
   	  pageNumber:1,
   	  lauthorStatus:[],
   	  lsponsorConnexions:[],
   	  lrecipientConnexions:[]
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

	isKnown: function() {
		return this.authorType == 'known';
	},
	
	isAnonymous: function() {
		return this.authorType == 'anonymous';
	},
	
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
    
    authorName: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.name;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.author) {
				this.metadata.source.author = {}
			}
			this.metadata.source.author.name=value;
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
		},
		
		set: function(value) {
			if (!this.metadata.source.author) {
				this.metadata.source.author = {}
			}
			this.metadata.source.author.gender=value;
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
    
     authorUrl: { 
    
 	   get: function () {
			if (this.metadata && this.metadata.source && this.metadata.source.author) {
				return this.metadata.source.author.url;
			}
			else {
				return null;
			}
		},
		
		set: function(value) {
			if (!this.metadata.source.author) {
				this.metadata.source.author = {}
			}
			this.metadata.source.author.url=value;
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
    
    isAnonymousMan: function() {
    	return (this.isAnonymous && (this.authorGender=='m'));
    },
    
    isAnonymousWoman: function() {
    	return (this.isAnonymous && (this.authorGender=='f'));
    }
    
    
    
  },

  methods: {
  
  resetStatus() {
  	this.lauthorStatus=[]
  },
  
  postMetadataLoad: function() {
  		if (this.isAnonymous) {
  			this.lauthorStatus = this.metadata.source.author.status;
  		}
  		this.lsponsorConnexions = this.metadata.source.author.sponsorConnexions;
  		this.lrecipientConnexions = this.metadata.source.author.recipientConnexions;
  },
  
  select: function(author) {
  	this.metadata.source.author.name = author.name
  	this.metadata.source.author.gender = author.gender
  	this.metadata.source.author.url = author.url
  	this.metadata.source.author.status = author.status
  	this.hideDatabaseModal();
  },
  
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },
    
    hideDatabaseModal() {
    	this.modal = false;
    },
    
    initModal() {
    	this.authors=[]
      	this.hits=0
   	  	this.pageSize=0
   	  	this.pageNumber=1
    },
    
    resetAuthor() {
    this.metadata.source.author.name = ''
  	this.metadata.source.author.gender = ''
  	this.metadata.source.author.url = ''
  	this.lauthorStatus=[]
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
    	 this.$el.querySelectorAll(".sublabel").forEach(el => el.style.borderLeftColor = this.theme.primary);
    	 this.$el.querySelectorAll(".sublabel-title").forEach(el => el.style.background = this.theme.primary);
    	}
    
    }
  }
}
</script>
