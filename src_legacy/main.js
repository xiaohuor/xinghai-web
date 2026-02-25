import Vue from 'vue';
import App from './App.vue';
import ViewUI from "view-design";
import "@/assets/theme.less";
Vue.use(ViewUI);
import router from "./router";


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
