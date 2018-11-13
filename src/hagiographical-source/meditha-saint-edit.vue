<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/saint-locales.json"></i18n>

<template>
<main>
<table width="100%" style="border-spacing: 0px;">
 <col width="35%">
 <col width="65%">

<tr><td><h5 class="primary-color">{{$t('name')}}:</h5></td><td>
<input class="meditha-input" v-model="name" ></input>
 </td></tr>

 <tr><td><h5 class="primary-color">{{$t('gender')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="gender" @change="status=null">
 <option value="m">{{$t('m')}}</option>
 <option value="f">{{$t('f')}}</option>
 <option value="family">{{$t('family')}}</option>
 </select>
 
 </td></tr> 
 
 <tr  v-show="gender=='family'"><td><h5 class="primary-color">{{$t('relationship')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="relationship" >
 <option value="fatherAndChild">{{$t('fatherAndChild')}}</option>
 <option value="motherAndChild">{{$t('motherAndChild')}}</option>
 <option value="brothers">{{$t('brothers')}}</option>
 <option value="sisters">{{$t('sisters')}}</option>
  <option value="couple">{{$t('couple')}}</option>
    <option value="other">{{$t('other')}}</option>
 </select>
 </td></tr> 
 
  <tr v-show="relationship=='other'"><td><h5 class="primary-color">{{$t('specify')}}:</h5></td><td>
<input class="meditha-input" v-model="otherRelationship" ></input>
 </td></tr>

 <tr v-show="gender=='m'||gender=='f'"><td><h5 class="primary-color">{{$t('status')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="status">
 <option v-show="gender=='f'" value="nun">{{$t('nun')}}</option>
 <option v-show="gender=='f'" value="abbess">{{$t('abbess')}}</option>
 <option v-show="gender=='f'" value="canoness">{{$t('canoness')}}</option>
 <option v-show="gender=='f'" value="widow">{{$t('widow')}}</option>
 <option v-show="gender=='f'" value="queen">{{$t('queen')}}</option>
 <option v-show="gender=='f'" value="secular_female">{{$t('secular_female')}}</option>
 <option v-show="gender=='m'"  value="monk">{{$t('monk')}}</option>
 <option v-show="gender=='m'" value="abbot">{{$t('abbot')}}</option>
 <option v-show="gender=='m'" value="widower">{{$t('widower')}}</option>
 <option v-show="gender=='m'" value="canon">{{$t('canon')}}</option>
 <option v-show="gender=='m'" value="bishop">{{$t('bishop')}}</option>
 <option v-show="gender=='m'" value="hermit">{{$t('hermit')}}</option>
 <option v-show="gender=='m'" value="king">{{$t('king')}}</option>
 <option v-show="gender=='m'" value="secular_male">{{$t('secular_male')}}</option>
 <option value="other">{{$t('other')}}</option>
 
 </select>
 
 </td></tr> 
 
 <tr v-show="status=='other'"><td><h5 class="primary-color">{{$t('specify')}}:</h5></td><td>
<input class="meditha-input" v-model="otherStatus" ></input>
 </td></tr>
 
 
 <tr><td><h5 class="primary-color">{{$t('type')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="type">
 <option value="martyr">{{$t('martyr')}}</option>
 <option value="doctor">{{$t('doctor')}}</option>
 <option value="confessor">{{$t('confessor')}}</option>
 <option value="virgin">{{$t('virgin')}}</option>
 <option value="angel">{{$t('angel')}}</option>
 </select>
 
 </td></tr> 


 <tr><td><h5 class="primary-color">{{$t('contemporaryOf')}}:</h5></td><td>
 
 <input type="checkbox" id="chkContemporaryOf1" value="nero" v-model="contemporaryOf">  <label for="chkContemporaryOf1">{{$t('nero')}}</label>
 <input type="checkbox" id="chkContemporaryOf2" value="saintPeter" v-model="contemporaryOf">  <label for="chkContemporaryOf2">{{$t('saintPeter')}}</label>
 <input type="checkbox" id="chkContemporaryOf3" value="maximian" v-model="contemporaryOf">  <label for="chkContemporaryOf3">{{$t('maximian')}}</label>
 <input type="checkbox" id="chkContemporaryOf4" value="diocletian" v-model="contemporaryOf">  <label for="chkContemporaryOf4">{{$t('diocletian')}}</label>
 <input type="checkbox" id="chkContemporaryOf5" value="constantine" v-model="contemporaryOf">  <label for="chkContemporaryOf5">{{$t('constantine')}}</label>
 <input type="checkbox" id="chkContemporaryOf6" value="constantius" v-model="contemporaryOf">  <label for="chkContemporaryOf6">{{$t('constantius')}}</label>
 <input type="checkbox" id="chkContemporaryOf7" value="clovis" v-model="contemporaryOf">  <label for="chkContemporaryOf7">{{$t('clovis')}}</label>
 <input type="checkbox" id="chkContemporaryOf8" value="chlotharII" v-model="contemporaryOf">  <label for="chkContemporaryOf8">{{$t('chlotharII')}}</label>
 <input type="checkbox" id="chkContemporaryOf9" value="dagobert" v-model="contemporaryOf">  <label for="chkContemporaryOf9">{{$t('dagobert')}}</label>
 <input type="checkbox" id="chkContemporaryOf10" value="pepinIII" v-model="contemporaryOf">  <label for="chkContemporaryOf10">{{$t('pepinIII')}}</label>
  <input type="checkbox" id="chkContemporaryOf11" value="liutprand" v-model="contemporaryOf">  <label for="chkContemporaryOf11">{{$t('liutprand')}}</label>
 <input type="checkbox" id="chkContemporaryOf12" value="charlemagne" v-model="contemporaryOf">  <label for="chkContemporaryOf12">{{$t('charlemagne')}}</label>
 <input type="checkbox" id="chkContemporaryOf13" value="louisThePious" v-model="contemporaryOf">  <label for="chkContemporaryOf13">{{$t('louisThePious')}}</label>
<input type="checkbox" id="chkContemporaryOf14" value="charlesTheBald" v-model="contemporaryOf">  <label for="chkContemporaryOf14">{{$t('charlesTheBald')}}</label>
  <input type="checkbox" id="chkContemporaryOf15" value="ottoI" v-model="contemporaryOf">  <label for="chkContemporaryOf15">{{$t('ottoI')}}</label>
 <input type="checkbox" id="chkContemporaryOf16" value="ottoII" v-model="contemporaryOf">  <label for="chkContemporaryOf16">{{$t('ottoII')}}</label>
 <input type="checkbox" id="chkContemporaryOf17" value="ottoIII" v-model="contemporaryOf">  <label for="chkContemporaryOf17">{{$t('ottoIII')}}</label>
	
 </select>
 
 </td></tr> 


 <tr><td><h5 class="primary-color">{{$t('diesNatalis')}}:</h5></td><td>
 
 <select class="meditha-select" v-model="diesNatalisDay" style="width:20%">
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
 <option value="19">19</option>
 <option value="20">20</option>
 <option value="21">21</option>
 <option value="22">22</option>
 <option value="23">23</option>
 <option value="24">24</option>
 <option value="25">25</option>
 <option value="26">26</option>
 <option value="27">27</option>
 <option value="28">28</option>
 <option value="29">29</option>
 <option value="30" v-show="has30days">30</option>
 <option value="31" v-show="has31days">31</option>
 </select>
 
 <select class="meditha-select" v-model="diesNatalisMonth"  style="width:78%">
 <option value="1">{{$t('january')}}</option>
 <option value="2">{{$t('february')}}</option>
 <option value="3">{{$t('march')}}</option>
 <option value="4">{{$t('april')}}</option>
 <option value="5">{{$t('may')}}</option>
 <option value="6">{{$t('june')}}</option>
 <option value="7">{{$t('july')}}</option>
 <option value="8">{{$t('august')}}</option>
 <option value="9">{{$t('september')}}</option>
 <option value="10">{{$t('october')}}</option>
 <option value="11">{{$t('november')}}</option>
 <option value="12">{{$t('december')}}</option>
 </select>
 
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
    
    gender(value) {
    	if (value=='family') {
    		this.status=null
    	}
    	else {
    		this.relationship=null
    	}
    },
    
    relationship(value) {
    	if (this.relationship != 'other') {
    		this.otherRelationship = null
    	}
    },
    
     status(value) {
      if (value != 'other') {
      	this.otherStatus=null
      }
      if ((value == null) || (value=='')) {
      	this.otherStatus = null
      }
    },
    
    diesNatalisMonth(value) {
    	if ((this.diesNatalisDay >29) && (!this.has30days)) {
    		this.diesNatalisDay = 1
    	}
    	if ((this.diesNatalisDay >30) && (!this.has31days)) {
    		this.diesNatalisDay = 1
    	}
    }
    
  },

 
  data() {
    return {
      lang: 'en',
      _id:null,
      type:'',
      name:'',
      gender:'',
      relationship:'',
      otherRelationship:'',
      status:'',
      otherStatus:'',
      diesNatalisMonth:null,
      diesNatalisDay:null,
      contemporaryOf:[],
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
  
  has30days: function() {
  	if (!this.diesNatalisMonth) {
  		return true;
  	}
  	return (this.diesNatalisMonth != 2) 
  },
  
  has31days: function() {
  	if (!this.diesNatalisMonth) {
  		return true;
  	}
  	return ((this.diesNatalisMonth ==1) || (this.diesNatalisMonth ==3) || (this.diesNatalisMonth ==5) || (this.diesNatalisMonth ==7) || (this.diesNatalisMonth ==8) || (this.diesNatalisMonth ==10) || (this.diesNatalisMonth ==12))
  }
    
  },

  methods: {
  
  handlePagerSaveRequest:function(event) {
  	if (event.detail.collection=="saint") {
  			var item = {}
  			item.type=this.type
  			item.name=this.name
  			item.gender = this.gender,
  			item.relationship = this.relationship,
  			item.otherRelationship = this.otherRelationship,
  			item.status = this.status,
  			item.otherStatus = this.otherStatus,
  			item.diesNatalis = {}
  			item.diesNatalis.day=this.diesNatalisDay
  			item.diesNatalis.month= this.diesNatalisMonth
  			item.contemporaryOf= this.contemporaryOf
  			item._id = this._id
  		 	var response = { 'detail': {item: item, collection: event.detail.collection}}
			document.dispatchEvent(new CustomEvent('medithaPagerSaveResponse', response))
  	}
  },
  
  handlePagerEdit: function(event) {
  	if (event.detail.collection=="saint") {
  		var item = JSON.parse(JSON.stringify(event.detail.item));
  		this.type=item.type
  		this.name=item.name
  		this.relationship=item.relationship
  		this.otherRelationship=item.otherRelationship
  		if (item.contemporaryOf){
  			this.contemporaryOf= item.contemporaryOf
  		} else {
  			this.contemporaryOf=[]
  		}
  		this.status=item.status
  		this.otherStatus=item.otherStatus
  		if (item.diesNatalis) {
  		this.diesNatalisDay=item.diesNatalis.day
  		this.diesNatalisMonth=item.diesNatalis.month
  		}
  		this.gender = item.gender
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
