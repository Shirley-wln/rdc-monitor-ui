import Vue from "vue";
import App from "./App.vue";
import { Card, Badge, List, Layout } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Card);
Vue.use(Badge);
Vue.use(List);
Vue.use(Layout);

// axios.defaults.baseURL = "/";
// global.axios = axios;

new Vue({
  render: h => h(App)
}).$mount("#app");
