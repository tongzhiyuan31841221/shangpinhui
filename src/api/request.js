import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from "@/store/index"
let request = axios.create({
    // 设置请求的基础路径，发现真实服务器都带/api
    baseURL: "/api",
    // 设置请求超时时间
    timeout: 5000,
})
// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // 进度条开始
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.login.token){
        config.headers.token = store.state.login.token;
    }
    nprogress.start()
    return config;
});

// 添加响应拦截器
request.interceptors.response.use((res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nprogress.done()
    return res.data;
}, (err) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(err.message)
    return new Promise();
});
export default request