import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import RestResource from "./services/RestResource";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.prototype.$RestResource = new RestResource();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
