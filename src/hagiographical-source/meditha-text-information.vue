<i18n>
{
  "en": {
    "text": "Text"
  },
  "fr": {
    "text": "Texte"
  }
}
</i18n>

<template>
<meditha-block-layout v-if="visible" :title="$t('text')" icon="fa fa-pencil">
<main class="meditha-text-information-host">
<ul data-aeris-metadata-list="">
<li><h5 style="color: rgb(11, 107, 179);">Identifiant unique:</h5> <p>4d3be8dd-c41a-4f35-8ba6-722cf12e2de3</p></li>
<li><h5 style="color: rgb(11, 107, 179);">Dernière modifications:</h5> <p>September 6, 2018 6:00 PM</p></li>
<li><h5 style="color: rgb(11, 107, 179);">Centre de données AERIS:</h5> <p>SEDOO</p></li>
<li><h5 style="color: rgb(11, 107, 179);">Niveau de traitement de la donnèes:</h5> <p>L4</p></li>
</ul>
</main>
</meditha-block-layout>

</template>

<style>

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
    lang: {
      type: String,
      default: 'en'
    }


  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

 
  data() {
    return {
      data: [],
      visible: true
      //visible: false
    }
  },

  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
     	
    }
  }
}
</script>
