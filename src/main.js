import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Typenav from "@/pages/Home/Typenav"
import store from "./store"
// 让mock起码执行一次
import "./mock/mockServe"
import "swiper/css/swiper.css"
// import resCategory from "./api/index";
// import {getBanners} from "./api"
import Carsouel from "@/pages/Home/Carsouel"
import Pagination from "@/pages/Search/Pagination"
// 导入所有的请求函数
import * as API from "@/api"
// 按需引入element
import { MessageBox, Button } from 'element-ui';
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false
Vue.component("Typenav", Typenav)
Vue.component("Carsouel", Carsouel)
Vue.component("Pagination", Pagination)
// 引入懒加载插件,图片是默认暴露的
import error from "./assets/images/error.jpg"
import loading from "./assets/images/loading.gif"

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})
import "@/utils/validate"

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
})
