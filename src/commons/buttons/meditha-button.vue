<template>
<span meditha-button-host>
  <button type="button"  class="primary-background primary-color">
    <i v-if="icon"   :class='["fa", icon]'></i>
    {{text}}
  </button>
</span>
</template>

<script>
export default {

  props: {
    icon: {
      type: String
    },
    text: {
      type: String
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
  
  
  methods: {
  
   handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
    if (this.$el && this.theme) {
    	 this.$el.querySelectorAll(".primary-background").forEach(el => el.style.background = this.theme.primary);
    	 if (this.theme.primarytext) {
    	 	this.$el.querySelectorAll(".primary-color").forEach(el => el.style.color = this.theme.primarytext);
    	 }
    	}
    
    }
  }
}
</script>

<style>
[meditha-button-host] button {
  align-items: center;
  border: none;
  outline: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: #ddd;
  color: #444;
  font-size: 1rem;
  cursor: pointer;
}

[meditha-button-host] button i {
}

[meditha-button-host] .accent {
  background: #333;
  color: #FFF;
}

[meditha-button-host] button::-moz-focus-inner {
  border: 0;
}

[meditha-button-host] button:hover {
  filter: brightness(80%);
}
</style>
