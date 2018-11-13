<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/referencemanuscript-locales.json"></i18n>

<template>
<main>
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">

<tr><td><h5 class="primary-color">{{$t('cote')}}:</h5></td><td>
<input class="meditha-input" v-model="cote" ></input>
 </td></tr>
 
 <tr><td><h5 class="primary-color">{{$t('role')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="role">
 <option value="authorManuscript">{{$t('authorManuscript')}}</option>
 <option value="singleManuscript">{{$t('singleManuscript')}}</option>
 <option value="libellus">{{$t('libellus')}}</option>
 <option value="other">{{$t('other')}}</option>
 </select>
 
 </td></tr> 

<tr v-show="role=='other'"><td><h5 class="primary-color">{{$t('specify')}}:</h5></td><td>
   <input class="meditha-input" v-model="otherRole" ></input>
 </td></tr> 



 <tr><td><h5 class="primary-color">{{$t('link')}}:</h5></td><td>
  <input class="meditha-input" v-model="link" ></input>
 </td></tr>

 <tr><td><h5 class="primary-color">{{$t('bibliography')}}:</h5></td><td>
 <textarea  rows="10" style="width:100%" v-model="bibliography"></textarea>
 </td></tr>

</table>


</main>
</template>

<style>
@import './../commons/meditha-style.css';




</style>

<script>
export default {
  props: {
  

  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    },
    role(value) {
		if (this.role != 'other') {
  					this.otherRole=null;
  		}
    }
    
  },

 
  data() {
    return {
      lang: 'en',
      role:null,
      _id:null,
      otherRole:'',
      cote:'',
      link:'',
      bibliography:'',
      medithaPagerSelectListener: null,
      medithaPagerSaveRequestListener:null,
    }
  },
  
   mounted: function() {
    var event = new CustomEvent('medithaThemeRequest', {});
    document.dispatchEvent(event);
  },

  destroyed: function() {
    document.removeEventListener('medithaTheme', this.medithaThemeListener);
    this.medithaThemeListener = null;
    document.removeEventListener('medithaPagerEditEvent', this.medithaPagerEditListener);
    this.medithaPagerEditListener = null;
    document.removeEventListener('medithaPagerSaveRequest', this.medithaPagerSaveRequestListener);
    this.medithaPagerSaveRequestListener = null;
  },

  created: function() {
    this.medithaThemeListener = this.handleTheme.bind(this);
    document.addEventListener('medithaTheme', this.medithaThemeListener);
    this.medithaPagerEditListener = this.handlePagerEdit.bind(this);
    document.addEventListener('medithaPagerEditEvent', this.medithaPagerEditListener);
    this.medithaPagerSaveRequestListener = this.handlePagerSaveRequest.bind(this);
    document.addEventListener('medithaPagerSaveRequest', this.medithaPagerSaveRequestListener);
  },

  updated: function() {
    this.ensureTheme();
  },
  
  computed: {
    
  },

  methods: {
  
  handlePagerSaveRequest:function(event) {
  	if (event.detail.collection=="referencemanuscript") {
  			var item = {}
  			item.role=this.role
  			item.otherRole = this.otherRole
  			item.cote = this.cote
  			item.link = this.link
  			item._id = this._id
  			item.bibliography = this.bibliography
  		 	var response = { 'detail': {item: item, collection: event.detail.collection}}
			document.dispatchEvent(new CustomEvent('medithaPagerSaveResponse', response))
  	}
  },
  
  handlePagerEdit: function(event) {
  	if (event.detail.collection=="referencemanuscript") {
  		var item = JSON.parse(JSON.stringify(event.detail.item));
  		this.role=item.role
  		this.otherRole = item.otherRole
  		this.cote = item.cote
  		this.link = item.link
  		this.bibliography = item.bibliography
  		this._id = item._id
  		
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
    
    }
  
    
  }
}
</script>
