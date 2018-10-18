<template>
<span class="meditha-notifier-host">
<div class="meditha-notifier-container">
<ul>
<li v-for="notification in notifications" class="notification" :key="notification.uuid">
<meditha-notification  :type="notification.type" :message="notification.message" :spinner="notification.spinner" :closable="notification.closable" :uuide="notification.uuid"></meditha-notification>
</li>
</ul>
</div>
</span>
</template>
<script>
export default {
props: {
  },
  data () {
    return {
    	notifications: [],
    	medithaNotificationDestroyedEventListener: null,
    	medithaNotificationMessageEventListener: null,
    	errorErrorNotificationMessageEventListener: null,
    	medithaLongActionStartEventListener: null,
    	medithaLongActionStopEventListener: null
    }
  },
  
  mounted: function() {
  },
  
  created: function () {
	  
	  this.errorNotificationMessageEventListener = this.handleErrorNotificationMessageEvent.bind(this)
	  document.addEventListener('medithaErrorNotificationMessageEvent', this.errorNotificationMessageEventListener);
	  
	  this.medithaNotificationMessageEventListener = this.handleNotificationMessageEvent.bind(this)
	  document.addEventListener('medithaNotificationMessageEvent', this.medithaNotificationMessageEventListener);
	  
	  this.medithaNotificationDestroyedEventListener = this.handleNotificationDestroyed.bind(this)
	  document.addEventListener('medithaNotificationDestroyed', this.medithaNotificationDestroyedEventListener);
	  
	  this.medithaLongActionStartEventListener = this.handleLongActionStartEvent.bind(this)
	  document.addEventListener('medithaLongActionStartEvent', this.medithaLongActionStartEventListener);
	  
	  this.medithaLongActionStopEventListener = this.handleLongActionStopEvent.bind(this)
	  document.addEventListener('medithaLongActionStopEvent', this.medithaLongActionStopEventListener);
  },
  
  destroyed: function() {
	  	document.removeEventListener('medithaNotificationMessageEvent', this.medithaNotificationMessageEventListener);
	  	this.medithaNotificationMessageEventListener = null;
	  	
	  	document.removeEventListener('medithaErrorNotificationMessageEvent', this.medithaErrorNotificationMessageEventListener);
	  	this.medithaErrorNotificationMessageEventListener = null;
	  	
	  	document.removeEventListener('medithaNotificationDestroyed', this.medithaNotificationDestroyedEventListener);
	  	this.medithaNotificationDestroyedEventListener = null;
	  	
	  	document.removeEventListener('medithaLongActionStartEvent', this.medithaLongActionStartEventListener);
	  	this.medithaLongActionStartEventListener = null;
	  	document.removeEventListener('medithaLongActionStopEvent', this.medithaLongActionStopEventListener);
	  	this.medithaLongActionStopEventListener = null;
		 
  },
  
  computed: {
  },
  methods: {
	    
      handleNotificationMessageEvent: function(e) {
    	  console.log("handleNotificationMessageEvent")
    	  var uuid = this.computeUuid()
    	  var notification = {
    	          message: e.detail.message,
    	          type: 'notification',
    	          uuid: uuid,
    	          closable: true,
    	          spinner: false
    	  };
    	  console.log("depot notif "+uuid)
    	  this.notifications.push(notification)
   		  window.setTimeout(function(){document.dispatchEvent(new CustomEvent('medithaNotificationDestroyed', { 'detail': {uuid: uuid}}))}, 2000);
      },
      
      computeUuid:  function(){
    	  var aux = Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1);
    	  return aux;
      },
      
      handleLongActionStartEvent: function(e) {
    	  var uuid = this.computeUuid()
          var notification = {
            message: e.detail.message,
            type: 'wait',
            spinner: true,
            uuid: uuid,
            closable: true
          };
          this.notifications.push(notification)
        },
      
      handleErrorNotificationMessageEvent: function(e) {
    	  console.log("handleErrorNotificationMessageEvent")
    	  var notification = {
              message: e.detail.message,
              type: 'error',
              closable	: true,
              spinner: false
            };
    	  this.notifications.push(notification)
    	  
      },
      
      handleNotificationDestroyed: function (e) {
    	  console.log("Demande Destruction notif "+e.detail.uuid)
    	  
    	  var index = this.notifications.findIndex(i => i.uuid === e.detail.uuid);
    	  if (index > -1) {
   		   this.notifications.splice(index, 1);
   		   console.log("Destruction notif "+e.detail.uuid)
    	  }
   		   console.log(this.notifications.length)
      },
      
      handleLongActionStopEvent: function(e) {
    	  var message= e.detail.message
    	  console.log("Demande Destruction notif "+e.detail.message)
    	  
    	  var index = this.notifications.findIndex(i => ((i.message === e.detail.message) && (i.type==='wait')));
    	  if (index > -1) {
   		   this.notifications.splice(index, 1);
   		   console.log("Destruction notif "+e.detail.uuid)
    	  }
   		   console.log(this.notifications.length)
        }
      
  }
}
</script>
<style>
.meditha-notifier-host {
	display: block;
	position: absolute;
	z-index: 9999;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
}
.meditha-notifier-host .notification {
	list-style-type: none;
}
.meditha-notifier-host meditha-notification {
}
.meditha-notifier-host .meditha-notifier-container {
	display: flex;
	flex-direction: column;
}
</style>