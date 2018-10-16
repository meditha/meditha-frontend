<i18n>
{
  "en": {
    "other": "Other",
    "sponsor": "Sponsor",
    "secular": "Secular",
    "bishop": "Bishop",
    "abbot": "Abbot",
    "abbess": "Abbess",
    "canon": "Canon",
    "community": "Community",
    "name": "Name"
  },
  "fr": {
    "other": "Autre",
    "sponsor": "Commanditaire",
    "secular": "Laïc",
    "bishop": "Evêque",
    "abbot": "Abbé",
    "abbess": "Abbesse",
    "canon": "Chanoine",
    "community": "Communauté",
    "name": "Nom"
  }
}
</i18n>

<template>
<div meditha-block-layout data-template="metadata-block">
  <header>
    <h3><i class="fa fa-user primary-color"></i>{{$t('sponsor')}}</h3>
  </header>
<main class="meditha-text-information-host">
	{{$t(sponsorType)}}
	{{sponsorName}}
</main>
</div>

</template>

<style>

.meditha-full-width {
	width: 100%
}

.sublabel.noleftborder {
	padding-left: 0px;
}

.sublabel h5{
	padding-left: 10px;
}

.sublabel {
	border-left : 1px solid #ccc;
}

.meditha-input {
	width: 100%;
	line-height: 1.7;
	color: #666;
	border: 1px solid #ccc;
	padding: 3px;
	font-size: 1rem;
	font-family: arial;
}

.meditha-select {
	padding: 3px 3px 3px 0px;
	width: 100%;
	line-height: 1.7;
	color: #666;
	border: 1px solid #ccc;
	font-size: 1rem;
	font-family: arial;
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
  
    sponsorType: function() {
    	if (this.metadata && this.metadata.source && this.metadata.source.sponsor) {
			return this.metadata.source.sponsor.type;
		}
		else {
			return null;
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
			this.metadata.source.sponsor.name=value;
		}     
		
    },
  },

  methods: {
  
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
