import '@babel/polyfill'
import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { sync } from 'vuex-router-sync'
import Panel from '@/components/Panel'

Vue.config.productionTip = false

Vue.component('Panel', Panel)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
