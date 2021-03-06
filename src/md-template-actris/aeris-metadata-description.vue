<i18n>
  {
    "en": {
      "description": "Description"
    },
    "fr": {
      "description": "Description"
    }
  }
</i18n>

<template>
<aeris-metadata-layout v-if="visible" :title="$t('description')" icon="fa fa-comment-o">
  <aeris-metadata-international-field v-if="visible" :html="markdown" :lang="lang" :content="value" no-label-float></aeris-metadata-international-field>
</aeris-metadata-layout>
</template>

<script>
var marked = require('marked');
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    markdown: {
      type: Boolean,
      default: true
    },
  },

  data() {
    return {
      visible: false,
      description: null,
      aerisMetadataListener: null
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisMetadataRefreshed', this.aerisMetadataListener);
    this.aerisMetadataListener = null;
  },

  created: function() {
    console.log("Aeris Metadata Description - Creating");
    this.$i18n.locale = this.lang
    this.aerisMetadataListener = this.handleRefresh.bind(this)
    document.addEventListener('aerisMetadataRefreshed', this.aerisMetadataListener);
  },

  computed: {
    value: function() {
      return JSON.stringify(this.description);
    }
  },

  methods: {

    /* Certaines metadonnées en markdown ne présentent pas d'espace entre le # et la suite du texte. On corrige. */

    addSpaces: function(value) {
      var aux = value.replace(/#/g, '# ')
      aux = aux.replace(/# #/g, '##')
      aux = aux.replace(/# #/g, '##')
      return aux
    },

    handleRefresh: function(data) {
      console.log("Aeris Metadata Description - Refreshing");
      this.visible = false;

      if ((!data)) {
        return
      }
      if ((!data.detail)) {
        return
      }
      if ((!data.detail.resourceAbstract)) {
        return
      }

      if (this.markdown) {
        var descriptions = data.detail.resourceAbstract;

        /* Convert markdown description to html for each language */
        for (var item in descriptions) {
          if (descriptions.hasOwnProperty(item)) {
            descriptions[item] = marked(this.addSpaces(descriptions[item]));
          }
        }
        this.description = descriptions;
      } else {
        this.description = data.detail.resourceAbstract;
      }
      this.visible = true;
    }

  }
}
</script>
