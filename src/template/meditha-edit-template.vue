<i18n>
{
  "en": {
    "hagiographicalSource": "hagiographical source",
    "manuscriptsAndSchools": "TBTranslated manuscrits et écoles",
    "schoolFormationOfTheSaints": "school formation of the saints",
    "hagiographicalKnowledgeAndWriting": "hagiographical knowledge and writing"
    
  },
  "fr": {
    "hagiographicalSource": "source hagiographique",
    "manuscriptsAndSchools": "manuscrits et écoles",
    "schoolFormationOfTheSaints": "formation scolaire des saints",
    "hagiographicalKnowledgeAndWriting": "connaissance et écriture hagiographique"
  }
}
</i18n>

<template>
<span class="meditha-display-template-host">
	
<meditha-common-style></meditha-common-style>
<div class="metadata-title fake-table-container">
<h3>{{bhlIdentifier}}</h3>
<span class="cartouches fake-table-right" >
	<span class="cartouche" :style="computeSourceTabStyle" @click="activeTab='sourceTab'" :title="$t('hagiographicalSource')" >{{$t("hagiographicalSource")}}</span>
	<span class="cartouche" :style="computeManuscriptTabStyle" @click="activeTab='manuscriptTab'">{{$t("manuscriptsAndSchools")}}</span>
	<span class="cartouche" :style="computeEducationTabStyle" @click="activeTab='educationTab'">{{$t("schoolFormationOfTheSaints")}}</span>
	<span class="cartouche" :style="knowledgeTabStyle" @click="activeTab='knowledgeTab'">{{$t("hagiographicalKnowledgeAndWriting")}}</span>
	<meditha-save-button></meditha-save-button>
	
</span>
</div>


<meditha-source-edit-tab v-show="activeTab == 'sourceTab'"></meditha-source-edit-tab>
<meditha-manuscript-edit-tab v-show="activeTab == 'manuscriptTab'"></meditha-manuscript-edit-tab>
<meditha-education-edit-tab v-show="activeTab == 'educationTab'"></meditha-education-edit-tab>
<meditha-knowledge-edit-tab v-show="activeTab == 'knowledgeTab'"></meditha-knowledge-edit-tab>


</span>
</template>

<script>
export default {
	props: {
	  
	},
	
	watch: {
    	lang(value) {
      		this.$i18n.locale = value;
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

  computed: {
  
  	computeSourceTabStyle: function() {
  		return this.computeTabStyle(this.activeTab == 'sourceTab');
  	},
  	
  	computeEducationTabStyle: function() {
  		return this.computeTabStyle(this.activeTab == 'educationTab');
  	},
  	
  	computeManuscriptTabStyle: function() {
  		return this.computeTabStyle(this.activeTab == 'manuscriptTab');
  	},
  	
  	knowledgeTabStyle: function() {
  		return this.computeTabStyle(this.activeTab == 'knowledgeTab');
  	},
  
    bhlIdentifier: function() {
    	if (this.metadata && this.metadata.source) {
			return this.metadata.source.bhlIdentifier;
		}
		else {
			return null;
		} 
    }
  
    
  },

   data () {
    return {
    	theme: null,
    	medithaThemeListener: null,
    	activeTab:"sourceTab",
    	 metadataListener:true,
      	metadata: null,
    	lang:'en'
    }
  },
  
  methods: {
  
    computeTabStyle: function(active) {
    	var inactiveStyle = { color: '#000', background: '#e2e2e2', cursor: 'pointer' };
    	var activeStyle = { color: '#000', background: '#e2e2e2'  };
    	if (this.theme != null) {
    		activeStyle.background = this.theme.primary;
    		if (this.theme.primarytext) {
    			activeStyle.color = this.theme.primarytext;
    		}
    	}
    	if (active) {
    		return activeStyle;
    	}
    	else {
    		return inactiveStyle;
    	}
    },
    
    handleTheme: function(event) {
      this.theme = event.detail;
    },
    
  
  }
}
</script>

<style>

.meditha-display-template-host .cartouche {
    padding: 4px 5px 6px;
    border-radius: 5px;
    font-weight: normal;
    font-variant: small-caps;
    font-size: 18px;
}

.meditha-display-template-host {
	display: block;
	height: 70vh;
	/*overflow: scroll;*/
}

.meditha-display-template-host * {
	box-sizing: border-box;
}

.meditha-display-template-host .metadata-title{
	border: none;
    background: #fafafa;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    margin-bottom:10px;
}

    
.meditha-display-template-host .fake-table-container {
  display: table;
  width: 100%;
}

.meditha-display-template-host .fake-table-right{
  display: table-cell;
  text-align: right;
  vertical-align: middle;
}

.meditha-display-template-host .metadata-title h3 {
	font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
}

.meditha-display-template-host .column .component-container {
	margin-bottom: 10px;
   
}

.meditha-display-template-host .column~.column {
	margin-left: 10px;
}

.meditha-display-template-host .column:first {
	margin-right:10px;
}

.meditha-display-template-host * {
	box-sizing: border-box;
}

.meditha-display-template-host .metadata-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}

.meditha-display-template-host .metadata-container .column {
	width: 50%;
}

 </style>