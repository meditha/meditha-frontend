require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import {VueMedithaLanguagePlugin} from './commons/meditha-language-mixins.js'
Vue.use(VueMedithaLanguagePlugin)

import {VueMedithaMetadataPlugin} from './commons/meditha-metadata-mixins.js'
Vue.use(VueMedithaMetadataPlugin)



import MedithaTheme from './commons/meditha-theme.vue';
import MedithaLanguage from './commons/meditha-language.vue';
import MedithaFakeMetadata from './commons/meditha-fake-metadata.vue';
import MedithaCommonStyle from './commons/meditha-common-style.vue';
import MedithaTextInformation from './hagiographical-source/meditha-text-information.vue';
import MedithaBhlIdentification from './hagiographical-source/meditha-bhl-identification.vue';
import MedithaBhlIdentificationEdit from './hagiographical-source/meditha-bhl-identification-edit.vue';
import MedithaSponsorEdit from './hagiographical-source/meditha-sponsor-edit.vue';
import MedithaAuthor from './hagiographical-source/meditha-author.vue';
import MedithaDisplayTemplate from './template/meditha-display-template.vue';
import MedithaSourceDisplayTab from './template/meditha-source-display-tab.vue';
import MedithaEducationDisplayTab from './template/meditha-education-display-tab.vue';
import MedithaManuscriptDisplayTab from './template/meditha-manuscript-display-tab.vue';
import MedithaKnowledgeDisplayTab from './template/meditha-knowledge-display-tab.vue';


ljs.addAliases({
	dep: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 
		'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js']
})

ljs.load('dep', function() {
	
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	
	var timer;
	
	function stopTimer() {
	    clearInterval(timer);
	}
	
	function registerElement(name, component) {
        if (!window.registredAerisElements) {
            window.registredAerisElements = [];
        }
        if (window.registredAerisElements.indexOf(name) < 0) {
            Vue.customElement(name, component);
            window.registredAerisElements.push(name)
        }
    }
	
	function register() {
		console.info("trying to register meditha metadata components")
		registerElement('meditha-theme', MedithaTheme);
		registerElement('meditha-language', MedithaLanguage);
		registerElement('meditha-fake-metadata', MedithaFakeMetadata);
		registerElement('meditha-text-information', MedithaTextInformation);
		registerElement('meditha-common-style', MedithaCommonStyle);
		registerElement('meditha-bhl-identification', MedithaBhlIdentification);
		registerElement('meditha-bhl-identification-edit', MedithaBhlIdentificationEdit);
		registerElement('meditha-sponsor-edit', MedithaSponsorEdit);
		registerElement('meditha-author', MedithaAuthor);
		registerElement('meditha-display-template', MedithaDisplayTemplate);
		registerElement('meditha-source-display-tab', MedithaSourceDisplayTab);
		registerElement('meditha-education-display-tab', MedithaEducationDisplayTab);
		registerElement('meditha-manuscript-display-tab', MedithaManuscriptDisplayTab);
		registerElement('meditha-knowledge-display-tab', MedithaKnowledgeDisplayTab);
		
		
		stopTimer()
//		if (window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1) {
//			
//			console.info("Start registration of Actris metadata components")
//			console.info("Registred elements at this time: "+window.registredAerisElements)
//			
//			registerElement('actris-download', ActrisDownload);
//			registerElement('md-template-actris', ActrisMetadata);
//						
//			stopTimer()
//			console.info("Actris metadata components registration complete")
//			
//		}
//		else {
//			console.info("aeris-metadata-components-vjs not available yet...")
//		}
	}
	
	timer = setInterval(function(){register()}, 1000);
})

