import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: "@/assets/error.jpg",
    loading: "@/assets/loading.gif",
    attempt: 1
})