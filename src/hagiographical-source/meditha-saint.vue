<i18n src="../commons/locales.json"></i18n>
<i18n src="./locales/saint-locales.json"></i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('saintTitle')}}</h3>
  </header>
<main class="meditha-saint-host">

<table v-show="edit" width="100%" style="border-spacing: 0px;">
<tr>
<td align="left">
</td>
</tr>
</table>

<div v-for="saint in metadata.source.saint" style="margin-bottom: 4px">

<i :class="saintStyle(saint)" />&nbsp{{saint.name}}<span v-show="edit">&nbsp;<i class="fa fa-trash clickable" @click="remove(saint)" :title="$t('delete')"></i></span>
<div class="saint-description">
<div style="display:flex;flex-direction: row;justify-content: flex-start">
	<div style="min-width:200px">
		<p v-show="saint.gender"><span class="label">{{$t('gender')}}:</span> {{$t(saint.gender)}}</p>
		<p v-show="hasRelationship(saint)" ><span  class="label">{{$t('relationship')}}:</span> {{$t(getRelatiohShip(saint))}}</p>
		<p v-show="hasStatus(saint)" ><span  class="label">{{$t('status')}}:</span> {{$t(getStatus(saint))}}</p>
		<p v-show="saint.type" ><span  class="label">{{$t('type')}}:</span> {{$t(saint.type)}}</p>
	</div>
		
	<div style="">
		<p v-show="saint.contemporaryOf"><span  class="label">{{$t('contemporaryOf')}}:</span> {{getContemporaryOf(saint)}}</p>
		<p v-show="saint.diesNatalis" ><span  class="label">{{$t('diesNatalis')}}:</span> {{saint.diesNatalis.day}} {{$t(saint.diesNatalis.month)}}</p>
	</div>
</div>
</div>



</div>
  
<div style="margin-top:10px">  
<span v-show="edit" style="cursor:pointer;margin-left:3px" class="meditha-button" @click="openDatabaseModal" :title="$t('addFromCoteDatabase')"><i class="fa fa-plus"></i> <span style="margin-left:3px">{{$t('add')}}</span></span>
</div>
</main>


<meditha-pager collection="saint" :modaltitle="$t('saints')" :tablelabels="$t('name')" tablecolumns="name" editable="true" :edittitle="$t('saint')" editcomponent="meditha-saint-edit"/>


</div>

</template>

<style>
@import './../commons/meditha-style.css';

.meditha-saint-host .saint-description {
    margin-left: .5em;
    padding: 3px 0 0 10px;
    border-left: 1px solid #bbb;
    font-size: .8em;
    line-height: 1.5em;
}

.meditha-saint-host .saint-description p{
    margin: 0 auto;
}

.label {
	font-weight: bold
}

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
      medithaPagerSelectListener:true,
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
     document.removeEventListener('medithaPagerSelectEvent', this.medithaPagerSelectListener);
    this.medithaPagerSelectListener = null;
  },

  created: function() {
    this.medithaThemeListener = this.handleTheme.bind(this);
    document.addEventListener('medithaTheme', this.medithaThemeListener);
     this.medithaPagerSelectListener = this.handlePagerSelect.bind(this);
    document.addEventListener('medithaPagerSelectEvent', this.medithaPagerSelectListener);
  },

  updated: function() {
    this.ensureTheme();
  },
  
  computed: {
  
    
  },

  methods: {
  
  
  handlePagerSelect: function(e) {
  	if (e.detail.collection =="saint") {
  		this.metadata.source.referencemanuscript = e.detail.item
  	}
  },
  
  hasRelationship: function(saint) {
  	if (saint.gender=="family") {
  		if (saint.status) {
  			return true;
  		}
  	}
  	return false
  },
  
  hasStatus: function(saint) {
  	if (saint.gender=="f" || saint.gender=="m") {
  		if (saint.status) {
  			return true;
  		}
  	}
  	return false
  },
  
  getRelatiohShip: function(saint) {
  	
  	if (saint.relationship) {
  		if (saint.relationship == 'other') {
  			if (saint.otherRelationship) {
  				return saint.otherRelationship
  			}
  		} 
  		return saint.relationship
  	}
  
  },
  
  getContemporaryOf(saint) {
  			if (saint.contemporaryOf) {
					var result = [];
					for (var i = 0; i < saint.contemporaryOf.length; i++) {
					result.push(this.$i18n.t(saint.contemporaryOf[i]))
					}
				
					return result.join(", ")
			}
			else {
				return "";
			}
  
  },
  
  getStatus: function(saint) {
  	if (saint.status) {
  		if (saint.status == 'other') {
  			if (saint.otherStatus) {
  				return saint.otherStatus
  			}
  		} 
  		return saint.status
  	}
  	
  },
  
  handlePagerSelect: function(e) {
  	if (e.detail.collection =="saint") {
  		this.metadata.source.saint.push(e.detail.item)
  	}
  },
  
  saintStyle: function(saint) {
	  if (!saint.gender) {
	  	return "fa fa-user"
	  }
	  if (saint.gender == 'family') {
	  	return 'fa fa-users'
	  } else {
	  	return 'fa fa-user'
	  }
	  
  },
  
  remove: function(saint) {
  
  var newItems = [];
   		
   		for (var i = 0; i < this.metadata.source.saint.length; i++) {
   			if (this.metadata.source.saint[i]._id == saint._id) {
   			} else {
   				newItems.push(this.metadata.source.saint[i])
   			}
   		}
  		this.metadata.source.saint = newItems
    
  
  },
  
  openDatabaseModal: function() {
  
   var event = new CustomEvent('medithaPagerShowEvent', { detail: {collection: 'saint'}});
   
    document.dispatchEvent(event);
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
  
    
  }
}
</script>
