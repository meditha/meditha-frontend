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

import {VueMedithaCommonFunctionPlugin} from './commons/meditha-common-function-mixins.js'
Vue.use(VueMedithaCommonFunctionPlugin)



import MedithaButton from './commons/buttons/meditha-button.vue';
import MedithaSaveButton from './commons/buttons/meditha-save-button.vue';
import MedithaNotifier from './commons/meditha-notifier.vue';
import MedithaNotification from './commons/meditha-notification.vue';
import MedithaTheme from './commons/meditha-theme.vue';
import MedithaPager from './commons/meditha-pager.vue';
import MedithaWordpressTheme from './commons/meditha-wordpress-theme.vue';
import MedithaLanguage from './commons/meditha-language.vue';
import MedithaFakeMetadata from './commons/meditha-fake-metadata.vue';
import MedithaMetadataLoader from './commons/meditha-metadata-loader.vue';
import MedithaCommonStyle from './commons/meditha-common-style.vue';
import MedithaBhlIdentification from './hagiographical-source/meditha-bhl-identification.vue';
import MedithaBhlIdentificationEdit from './hagiographical-source/meditha-bhl-identification-edit.vue';
import MedithaAuthorEdit from './hagiographical-source/meditha-author-edit.vue';
import MedithaSponsorEdit from './hagiographical-source/meditha-sponsor-edit.vue';
import MedithaWritingEdit from './hagiographical-source/meditha-writing-edit.vue';
import MedithaDatingEdit from './hagiographical-source/meditha-dating-edit.vue';
import MedithaReferenceManuscript from './hagiographical-source/meditha-referencemanuscript.vue';
import MedithaPublicationEdit from './hagiographical-source/meditha-publication-edit.vue';
import MedithaPublication from './hagiographical-source/meditha-publication.vue';
import MedithaDating from './hagiographical-source/meditha-dating.vue';
import MedithaSponsor from './hagiographical-source/meditha-sponsor.vue';
import MedithaSaint from './hagiographical-source/meditha-saint.vue';
import MedithaAuthor from './hagiographical-source/meditha-author.vue';
import MedithaSourceDisplayTab from './template/meditha-source-display-tab.vue';
import MedithaSourceEditTab from './template/meditha-source-edit-tab.vue';
import MedithaEducationDisplayTab from './template/meditha-education-display-tab.vue';
import MedithaManuscriptDisplayTab from './template/meditha-manuscript-display-tab.vue';
import MedithaKnowledgeDisplayTab from './template/meditha-knowledge-display-tab.vue';
import MedithaRecordList from './misc/meditha-record-list.vue';
import MedithaDisplayTemplate from './template/meditha-display-template.vue';
import MedithaEditTemplate from './template/meditha-edit-template.vue';

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
		registerElement('meditha-button', MedithaButton);
		registerElement('meditha-save-button', MedithaSaveButton);
		registerElement('meditha-notification', MedithaNotification);
		registerElement('meditha-notifier', MedithaNotifier);
		registerElement('meditha-theme', MedithaTheme);
		registerElement('meditha-pager', MedithaPager);
		registerElement('meditha-wordpress-theme', MedithaWordpressTheme);
		registerElement('meditha-language', MedithaLanguage);
		registerElement('meditha-fake-metadata', MedithaFakeMetadata);
		registerElement('meditha-metadata-loader', MedithaMetadataLoader)
		registerElement('meditha-common-style', MedithaCommonStyle);
		registerElement('meditha-bhl-identification', MedithaBhlIdentification);
		registerElement('meditha-bhl-identification-edit', MedithaBhlIdentificationEdit);
		registerElement('meditha-sponsor-edit', MedithaSponsorEdit);
		registerElement('meditha-author-edit', MedithaAuthorEdit);
		registerElement('meditha-writing-edit', MedithaWritingEdit);
		registerElement('meditha-dating-edit', MedithaDatingEdit);
		registerElement('meditha-referencemanuscript', MedithaReferenceManuscript);
		registerElement('meditha-publication-edit', MedithaPublicationEdit);
		registerElement('meditha-publication', MedithaPublication);
		registerElement('meditha-saint', MedithaSaint);
		registerElement('meditha-sponsor', MedithaSponsor);
		registerElement('meditha-author', MedithaAuthor);
		registerElement('meditha-dating', MedithaDating);
		registerElement('meditha-source-display-tab', MedithaSourceDisplayTab);
		registerElement('meditha-source-edit-tab', MedithaSourceEditTab);
		registerElement('meditha-education-display-tab', MedithaEducationDisplayTab);
		registerElement('meditha-manuscript-display-tab', MedithaManuscriptDisplayTab);
		registerElement('meditha-knowledge-display-tab', MedithaKnowledgeDisplayTab);
		registerElement('meditha-display-template', MedithaDisplayTemplate);
		registerElement('meditha-edit-template', MedithaEditTemplate);
		registerElement('meditha-record-list', MedithaRecordList);
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

